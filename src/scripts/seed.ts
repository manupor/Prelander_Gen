import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
  try {
    console.log('🌱 Starting database seed...')

    // Create a test user (you'll need to sign up manually first)
    const testEmail = 'demo@prelander.ai'
    
    // Get or create organization for demo user
    const { data: users } = await supabase.auth.admin.listUsers()
    const user = users.users.find(u => u.email === testEmail)
    
    if (!user) {
      console.log('❌ Demo user not found. Please sign up with demo@prelander.ai first.')
      return
    }

    const userId = user.id

    // Create organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .upsert({
        owner_user_id: userId,
        name: 'Demo Organization'
      })
      .select()
      .single()

    if (orgError) {
      console.error('Error creating organization:', orgError)
      return
    }

    console.log('✅ Created organization:', org.name)

    // Create sample sites
    const sampleSites = [
      {
        org_id: org.id,
        slug: 'techcorp-saas-demo',
        template_id: 't1',
        logo_url: 'https://via.placeholder.com/200x80/3B82F6/FFFFFF?text=TechCorp',
        primary_color: '#3B82F6',
        secondary_color: '#6B7280',
        accent_color: '#10B981',
        brand_name: 'TechCorp',
        industry: 'Technology',
        description: 'Leading provider of cloud-based business solutions for modern enterprises.',
        headline: 'Transform Your Business with AI',
        subheadline: 'TechCorp delivers cutting-edge solutions you can trust',
        cta: 'Start Free Trial',
        generated_html: '<div>Sample HTML for TechCorp</div>',
        generated_css: ':root { --brand-primary: #3B82F6; }',
        status: 'published'
      },
      {
        org_id: org.id,
        slug: 'healthplus-marketing-demo',
        template_id: 't2',
        logo_url: 'https://via.placeholder.com/200x80/10B981/FFFFFF?text=HealthPlus',
        primary_color: '#10B981',
        secondary_color: '#6B7280',
        accent_color: '#F59E0B',
        brand_name: 'HealthPlus',
        industry: 'Healthcare',
        description: 'Comprehensive healthcare solutions for better patient outcomes.',
        headline: 'Better Health Starts Here',
        subheadline: 'HealthPlus provides comprehensive care solutions',
        cta: 'Book Consultation',
        generated_html: '<div>Sample HTML for HealthPlus</div>',
        generated_css: ':root { --brand-primary: #10B981; }',
        status: 'draft'
      },
      {
        org_id: org.id,
        slug: 'leadgen-fitness-demo',
        template_id: 't3',
        logo_url: 'https://via.placeholder.com/200x80/EF4444/FFFFFF?text=FitLife',
        primary_color: '#EF4444',
        secondary_color: '#6B7280',
        accent_color: '#8B5CF6',
        brand_name: 'FitLife',
        industry: 'Fitness',
        description: 'Personal training and fitness coaching for a healthier lifestyle.',
        headline: 'Get Fit, Stay Strong',
        subheadline: 'FitLife helps you achieve your fitness goals',
        cta: 'Join Now',
        generated_html: '<div>Sample HTML for FitLife</div>',
        generated_css: ':root { --brand-primary: #EF4444; }',
        status: 'published'
      }
    ]

    for (const site of sampleSites) {
      const { data, error } = await supabase
        .from('sites')
        .insert(site)
        .select()
        .single()

      if (error) {
        console.error('Error creating site:', error)
      } else {
        console.log('✅ Created site:', data.brand_name)

        // Add some sample visits
        const visits = Array.from({ length: Math.floor(Math.random() * 50) + 10 }, (_, i) => ({
          site_id: data.id,
          ts: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          source: ['direct', 'google', 'social', 'email'][Math.floor(Math.random() * 4)],
          user_agent: 'Mozilla/5.0 (sample)'
        }))

        await supabase.from('visits').insert(visits)
        console.log(`  📊 Added ${visits.length} sample visits`)
      }
    }

    console.log('🎉 Database seeded successfully!')

  } catch (error) {
    console.error('❌ Seed failed:', error)
  }
}

seed()
