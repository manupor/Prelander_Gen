const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qcfhqvfmxnwmhqwcqmkk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmhxdmZteG53bWhxd2NxbWtrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjk0NzI3NCwiZXhwIjoyMDQyNTIzMjc0fQ.cKKGqGcJxXgGOGKNqOqWBGpwCBgdWvHRUmKgCJJdEYI'

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateConstraint() {
  try {
    console.log('Dropping existing constraint...')
    await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;'
    })
    
    console.log('Adding new constraint with t7...')
    await supabase.rpc('exec_sql', {
      sql: "ALTER TABLE sites ADD CONSTRAINT sites_template_id_check CHECK (template_id IN ('t1', 't2', 't3', 't4', 't5', 't6', 't7'));"
    })
    
    console.log('Constraint updated successfully!')
  } catch (error) {
    console.error('Error updating constraint:', error)
  }
}

updateConstraint()
