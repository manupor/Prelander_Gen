/**
 * Secure Data API Endpoint
 * Example of how to use the security system to protect sensitive data
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  encryptSensitiveData,
  decryptSensitiveData,
  encryptBankAccount,
  encryptCardData,
  maskSensitiveData,
  createAuditLog,
  sanitizeInput,
  RateLimiter,
  validateCSRFToken
} from '@/lib/security';

// Rate limiter for this endpoint
const rateLimiter = new RateLimiter(10, 60 * 1000); // 10 requests per minute

/**
 * GET - Retrieve encrypted user data
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimiter.isAllowed(`${user.id}-${clientIP}`)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Get data type from query params
    const { searchParams } = new URL(request.url);
    const dataType = searchParams.get('type') || 'all';
    
    // Fetch encrypted data
    let query = supabase
      .from('encrypted_user_data')
      .select('*')
      .eq('user_id', user.id);
    
    if (dataType !== 'all') {
      query = query.eq('data_type', dataType);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Decrypt data for response (only if user is authorized)
    const decryptedData = data?.map(item => {
      try {
        const decrypted = decryptSensitiveData(
          item.encrypted_value,
          item.iv,
          item.auth_tag
        );
        
        return {
          id: item.id,
          type: item.data_type,
          value: decrypted,
          masked: maskSensitiveData(decrypted, item.data_type as any),
          last4: item.last_4,
          metadata: item.metadata,
          created_at: item.created_at
        };
      } catch (e) {
        console.error('Decryption error:', e);
        return null;
      }
    }).filter(Boolean);
    
    // Log audit event
    await supabase.from('audit_logs').insert(
      createAuditLog({
        userId: user.id,
        action: 'data_access',
        resource: `encrypted_user_data:${dataType}`,
        ipAddress: clientIP,
        userAgent: request.headers.get('user-agent') || undefined,
        success: true,
        details: { count: decryptedData?.length || 0 }
      })
    );
    
    return NextResponse.json({
      success: true,
      data: decryptedData
    });
    
  } catch (error: any) {
    console.error('Error fetching secure data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST - Store encrypted sensitive data
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimiter.isAllowed(`${user.id}-${clientIP}`)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const { dataType, value, csrfToken, metadata } = body;
    
    // Validate CSRF token (if provided)
    if (csrfToken) {
      const { data: tokenData } = await supabase
        .from('csrf_tokens')
        .select('token')
        .eq('user_id', user.id)
        .single();
      
      if (!tokenData || !validateCSRFToken(csrfToken, tokenData.token)) {
        return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
      }
    }
    
    // Sanitize input
    const sanitizedValue = sanitizeInput(value);
    
    // Encrypt based on data type
    let encryptedData: any;
    let last4: string | undefined;
    
    switch (dataType) {
      case 'bank_account':
        encryptedData = encryptBankAccount(sanitizedValue, metadata?.bankName);
        last4 = encryptedData.last4;
        break;
      
      case 'card':
        encryptedData = encryptCardData(sanitizedValue);
        last4 = encryptedData.last4;
        break;
      
      case 'email':
      case 'pii':
      default:
        encryptedData = encryptSensitiveData(sanitizedValue);
        break;
    }
    
    // Store in database
    const { data: insertedData, error: insertError } = await supabase
      .from('encrypted_user_data')
      .upsert({
        user_id: user.id,
        data_type: dataType,
        encrypted_value: encryptedData.encrypted,
        iv: encryptedData.iv,
        auth_tag: encryptedData.authTag,
        last_4: last4,
        metadata: metadata || null,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,data_type'
      })
      .select()
      .single();
    
    if (insertError) {
      throw insertError;
    }
    
    // Log audit event
    await supabase.from('audit_logs').insert(
      createAuditLog({
        userId: user.id,
        action: 'data_create',
        resource: `encrypted_user_data:${dataType}`,
        ipAddress: clientIP,
        userAgent: request.headers.get('user-agent') || undefined,
        success: true,
        details: { data_type: dataType }
      })
    );
    
    return NextResponse.json({
      success: true,
      data: {
        id: insertedData.id,
        type: insertedData.data_type,
        masked: maskSensitiveData(sanitizedValue, dataType as any),
        last4: insertedData.last_4,
        created_at: insertedData.created_at
      }
    });
    
  } catch (error: any) {
    console.error('Error storing secure data:', error);
    
    // Log failed attempt
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    
    if (user) {
      await supabase.from('audit_logs').insert(
        createAuditLog({
          userId: user.id,
          action: 'data_create',
          resource: 'encrypted_user_data',
          ipAddress: clientIP,
          userAgent: request.headers.get('user-agent') || undefined,
          success: false,
          details: { error: error.message }
        })
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to store data', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Remove encrypted data
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Authenticate user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimiter.isAllowed(`${user.id}-${clientIP}`)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const dataType = searchParams.get('type');
    const dataId = searchParams.get('id');
    
    if (!dataType && !dataId) {
      return NextResponse.json(
        { error: 'Must provide either type or id' },
        { status: 400 }
      );
    }
    
    // Delete data
    let query = supabase
      .from('encrypted_user_data')
      .delete()
      .eq('user_id', user.id);
    
    if (dataId) {
      query = query.eq('id', dataId);
    } else if (dataType) {
      query = query.eq('data_type', dataType);
    }
    
    const { error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Log audit event
    await supabase.from('audit_logs').insert(
      createAuditLog({
        userId: user.id,
        action: 'data_delete',
        resource: `encrypted_user_data:${dataType || dataId}`,
        ipAddress: clientIP,
        userAgent: request.headers.get('user-agent') || undefined,
        success: true
      })
    );
    
    return NextResponse.json({
      success: true,
      message: 'Data deleted successfully'
    });
    
  } catch (error: any) {
    console.error('Error deleting secure data:', error);
    return NextResponse.json(
      { error: 'Failed to delete data', details: error.message },
      { status: 500 }
    );
  }
}
