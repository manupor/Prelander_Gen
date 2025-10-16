const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qcfhqvfmxnwmhqwcqmkk.supabase.co'
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmhxdmZteG53bWhxd2NxbWtrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjk0NzI3NCwiZXhwIjoyMDQyNTIzMjc0fQ.cKKGqGcJxXgGOGKNqOqWBGpwCBgdWvHRUmKgCJJdEYI'

const supabase = createClient(supabaseUrl, serviceKey)

async function fixConstraint() {
  try {
    console.log('Dropping existing constraint...')
    const { error: dropError } = await supabase.rpc('exec', {
      sql: 'ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;'
    })
    
    if (dropError) {
      console.log('Drop error (may be expected):', dropError.message)
    }
    
    console.log('Adding new constraint with t7...')
    const { error: addError } = await supabase.rpc('exec', {
      sql: "ALTER TABLE sites ADD CONSTRAINT sites_template_id_check CHECK (template_id IN ('t1', 't2', 't3', 't4', 't5', 't6', 't7'));"
    })
    
    if (addError) {
      console.error('Add constraint error:', addError.message)
    } else {
      console.log('✅ Constraint updated successfully!')
    }
    
    // Test insertion
    console.log('Testing t7 template insertion...')
    const testSlug = 'test-t7-' + Date.now()
    const { data: testData, error: testError } = await supabase
      .from('sites')
      .insert({
        org_id: '00000000-0000-0000-0000-000000000000',
        slug: testSlug,
        template_id: 't7',
        brand_name: 'Test',
        industry: 'Test',
        status: 'draft'
      })
      .select()
    
    if (testError) {
      console.error('❌ Test insertion failed:', testError.message)
    } else {
      console.log('✅ Test insertion successful!')
      
      // Clean up test record
      await supabase
        .from('sites')
        .delete()
        .eq('slug', testSlug)
      console.log('Test record cleaned up')
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

fixConstraint()
