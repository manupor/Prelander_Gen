const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qcfhqvfmxnwmhqwcqmkk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmhxdmZteG53bWhxd2NxbWtrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjk0NzI3NCwiZXhwIjoyMDQyNTIzMjc0fQ.cKKGqGcJxXgGOGKNqOqWBGpwCBgdWvHRUmKgCJJdEYI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkConstraint() {
  try {
    console.log('Checking current constraint...')
    const { data, error } = await supabase
      .from('information_schema.check_constraints')
      .select('*')
      .eq('constraint_name', 'sites_template_id_check')
    
    if (error) {
      console.error('Error checking constraint:', error)
      return
    }
    
    console.log('Current constraint:', data)
    
    // Try to insert a test record with t7
    console.log('Testing t7 insertion...')
    const { data: testData, error: testError } = await supabase
      .from('sites')
      .insert({
        org_id: '00000000-0000-0000-0000-000000000000',
        slug: 'test-t7',
        template_id: 't7',
        brand_name: 'Test',
        industry: 'Test',
        status: 'draft'
      })
      .select()
    
    if (testError) {
      console.error('Test insertion failed:', testError)
    } else {
      console.log('Test insertion successful:', testData)
      
      // Clean up test record
      await supabase
        .from('sites')
        .delete()
        .eq('slug', 'test-t7')
    }
    
  } catch (error) {
    console.error('Error:', error)
  }
}

checkConstraint()
