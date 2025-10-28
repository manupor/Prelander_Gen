# 🔧 Email No Llega - Troubleshooting Guide

## ❌ Problema: Los correos de confirmación no están llegando

---

## 🔍 Diagnóstico Rápido

### Checklist (Revisa en orden):

1. **[ ] ¿Supabase tiene SMTP configurado?**
2. **[ ] ¿El email está en spam/junk?**
3. **[ ] ¿Pasaron más de 5 minutos?**
4. **[ ] ¿El proyecto de Supabase está en modo desarrollo?**
5. **[ ] ¿Las URLs de redirect están configuradas?**

---

## 🚀 Soluciones por Orden de Probabilidad

### **Solución 1: Configurar SMTP en Supabase (CAUSA MÁS COMÚN)**

**Problema:** Supabase NO envía emails automáticamente en proyectos nuevos. Debes configurar SMTP.

**Pasos:**

1. **Ve a tu Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/[TU-PROJECT-ID]/settings/auth
   ```

2. **Navega a:** `Settings` → `Authentication` → `SMTP Settings`

3. **Revisa el estado:**
   - ❌ Si dice "Not Configured" o "Using Supabase Mail" → **ESTE ES EL PROBLEMA**
   - ✅ Si tiene configuración SMTP propia → Salta a Solución 2

4. **Opciones para configurar SMTP:**

   **Opción A - Usar Resend (Recomendado, Gratis hasta 3000 emails/mes):**
   
   a) Crea cuenta en https://resend.com
   
   b) Obtén tu API Key
   
   c) En Supabase SMTP Settings:
   ```
   SMTP Host: smtp.resend.com
   SMTP Port: 587
   SMTP Username: resend
   SMTP Password: [TU-RESEND-API-KEY]
   Sender Email: noreply@tu-dominio.com (o usa resend.dev)
   Sender Name: Prelander Gen
   ```

   **Opción B - Usar Gmail:**
   
   ```
   SMTP Host: smtp.gmail.com
   SMTP Port: 587
   SMTP Username: tu-email@gmail.com
   SMTP Password: [App Password - no tu contraseña normal]
   Sender Email: tu-email@gmail.com
   Sender Name: Prelander Gen
   ```
   
   ⚠️ Para Gmail debes crear una "App Password": https://myaccount.google.com/apppasswords

   **Opción C - Usar AWS SES (Ya lo tienes configurado):**
   
   ```
   SMTP Host: email-smtp.us-east-1.amazonaws.com
   SMTP Port: 587
   SMTP Username: [Tu AWS SES SMTP Username]
   SMTP Password: [Tu AWS SES SMTP Password]
   Sender Email: noreply@landertag.com
   Sender Name: Prelander Gen
   ```

5. **Guarda y prueba:**
   - Click "Save"
   - Intenta crear una cuenta nueva
   - El email debería llegar en ~30 segundos

---

### **Solución 2: Verificar Rate Limits**

Si SMTP está configurado pero no llegan emails:

1. **Ve a:** `Settings` → `Authentication` → `Rate Limits`

2. **Revisa límites:**
   ```
   Email sending rate limit: 4 emails/hour (default)
   ```

3. **Si alcanzaste el límite:**
   - Espera 1 hora
   - O aumenta el límite en Settings

---

### **Solución 3: Confirmar URLs de Redirect**

Los emails necesitan una URL de redirect válida.

1. **Ve a:** `Settings` → `Authentication` → `URL Configuration`

2. **Agrega tu URL en "Redirect URLs":**
   ```
   http://localhost:3000/**
   https://tu-dominio.vercel.app/**
   https://tu-dominio-production.vercel.app/**
   ```

3. **Guarda y reintenta**

---

### **Solución 4: Actualizar Código de Signup**

El código actual no especifica `emailRedirectTo`. Vamos a mejorarlo:

**Archivo:** `src/app/(auth)/signup/page.tsx`

**Encuentra esto (línea 48):**
```typescript
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      preferred_name: preferredName || email.split('@')[0]
    }
  }
})
```

**Cámbialo por:**
```typescript
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
    data: {
      preferred_name: preferredName || email.split('@')[0]
    }
  }
})
```

---

### **Solución 5: Crear Auth Callback Route**

Necesitas una ruta para manejar el callback después de confirmar email.

**Crear archivo:** `src/app/auth/callback/route.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to dashboard after confirming
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}
```

---

### **Solución 6: Revisar Logs de Supabase**

1. **Ve a:** `Logs` → `Auth Logs`

2. **Busca errores relacionados con:**
   - "email send failed"
   - "SMTP error"
   - "rate limit exceeded"

3. **Si ves errores de SMTP:**
   - Verifica las credenciales en Settings → Auth → SMTP
   - Prueba con otro proveedor (Resend es más confiable que Gmail)

---

### **Solución 7: Modo Development vs Production**

**En Development (localhost):**
- Supabase puede tener restricciones de email
- Los emails pueden tardar más

**Solución:**
1. Ve a: `Settings` → `Authentication` → `Email`
2. Activa: "Enable Email Confirmations"
3. Desactiva: "Require Email Confirmation" (temporalmente para testing)

---

### **Solución 8: Verificar Spam/Junk**

1. **Revisa la carpeta de Spam/Junk** en tu email
2. **Si está ahí:**
   - Marca como "Not Spam"
   - Configura un dominio personalizado en SMTP
   - Añade registros SPF/DKIM a tu dominio

---

### **Solución 9: Testing Manual**

**Prueba envío de email manualmente:**

1. Ve a Supabase Dashboard → Authentication → Users
2. Click en un usuario
3. Click "Send Magic Link"
4. Si este email tampoco llega → El problema es 100% SMTP

---

## 🎯 Solución Rápida Recomendada (5 minutos)

### Para empezar YA:

1. **Crea cuenta en Resend** (gratis): https://resend.com

2. **Obtén API Key**

3. **Ve a Supabase** → Settings → Auth → SMTP Settings

4. **Configura:**
   ```
   Host: smtp.resend.com
   Port: 587
   User: resend
   Pass: [TU-API-KEY]
   From: noreply@tu-proyecto.com
   ```

5. **Guarda y prueba signup nuevamente**

**Resultado:** Emails llegarán en 30 segundos ✅

---

## 📊 Tabla de Diagnóstico

| Síntoma | Causa Probable | Solución |
|---------|----------------|----------|
| Ningún email llega | SMTP no configurado | Solución 1 |
| Emails solo a veces | Rate limit alcanzado | Solución 2 |
| Error "Invalid redirect URL" | URLs no whitelisted | Solución 3 |
| Email llega pero link roto | No hay callback route | Solución 5 |
| Email en spam | Sender reputation baja | Usar dominio propio + SPF |

---

## 🔥 Debugging Avanzado

### Ver qué está pasando en tiempo real:

**1. Agregar logs al signup:**

```typescript
try {
  console.log('Attempting signup for:', email)
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        preferred_name: preferredName || email.split('@')[0]
      }
    }
  })

  console.log('Signup response:', { data, error })

  if (error) {
    console.error('Signup error:', error)
    setError(error.message)
  } else {
    console.log('Signup success! Check email.')
    setSuccess(true)
  }
} catch (err) {
  console.error('Signup exception:', err)
  setError('Authentication service is temporarily unavailable.')
}
```

**2. Ver Network tab en DevTools:**
- Abre DevTools (F12)
- Tab "Network"
- Intenta signup
- Busca request a `/auth/v1/signup`
- Revisa la response

---

## ✅ Checklist Final

Antes de contactar soporte, verifica:

- [ ] SMTP está configurado en Supabase
- [ ] Las credenciales SMTP son correctas
- [ ] El sender email es válido
- [ ] Las redirect URLs están whitelisted
- [ ] No alcanzaste el rate limit
- [ ] Revisaste spam/junk
- [ ] El proyecto está activo (no pausado)
- [ ] Intentaste con otro email provider
- [ ] Los logs de Supabase no muestran errores

---

## 📞 Contacto

Si después de todo esto no funciona:
- Email: support@supabase.com
- Discord: https://discord.supabase.com

**Incluye en tu mensaje:**
- Project ID
- Timestamp del intento
- Screenshot de SMTP settings
- Screenshot de Auth logs
