const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qcfhqvfmxnwmhqwcqmkk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmhxdmZteG53bWhxd2NxbWtrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjk0NzI3NCwiZXhwIjoyMDQyNTIzMjc0fQ.cKKGqGcJxXgGOGKNqOqWBGpwCBgdWvHRUmKgCJJdEYI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixConstraint() {
  try {
    console.log('Dropping constraint...')
    const { data: drop, error: dropError } = await supabase.rpc('exec_sql', {
      query: 'ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;'
    })
    
    if (dropError) {
      console.error('Drop error:', dropError)
    } else {
      console.log('Constraint dropped successfully')
    }
    
    console.log('Adding new constraint...')
    const { data: add, error: addError } = await supabase.rpc('exec_sql', {
      query: "ALTER TABLE sites ADD CONSTRAINT sites_template_id_check CHECK (template_id IN ('t1', 't2', 't3', 't4', 't5', 't6', 't7'));"
    })
    
    if (addError) {
      console.error('Add error:', addError)
    } else {
      console.log('New constraint added successfully')
    }
    
  } catch (error) {
    console.error('Error:', error)
  }
}

fixConstraint()
