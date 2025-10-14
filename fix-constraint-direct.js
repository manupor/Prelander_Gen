// Direct database constraint fix using service role key
const fetch = require('node-fetch');

async function fixConstraint() {
  const supabaseUrl = 'https://qcfhqvfmxnwmhqwcqmkk.supabase.co';
  const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmhxdmZteG53bWhxd2NxbWtrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjk0NzI3NCwiZXhwIjoyMDQyNTIzMjc0fQ.cKKGqGcJxXgGOGKNqOqWBGpwCBgdWvHRUmKgCJJdEYI';

  try {
    console.log('Executing SQL to fix constraint...');
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      },
      body: JSON.stringify({
        sql: `
          ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;
          ALTER TABLE sites ADD CONSTRAINT sites_template_id_check 
          CHECK (template_id IN ('t1', 't2', 't3', 't4', 't5', 't6', 't7'));
        `
      })
    });

    const result = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (response.ok) {
      console.log('✅ Constraint updated successfully!');
    } else {
      console.error('❌ Failed to update constraint');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fixConstraint();
