#!/usr/bin/env node

/**
 * Script para agregar la columna wheel_values a la tabla sites
 * Ejecutar con: node add-wheel-values-column.js
 */

const { createClient } = require('@supabase/supabase-js')

// Lee las variables de entorno
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Faltan variables de entorno')
  console.error('Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function addColumn() {
  console.log('🔧 Intentando agregar columna wheel_values...\n')
  
  try {
    // Primero verificamos si la columna ya existe
    const { data: testData, error: testError } = await supabase
      .from('sites')
      .select('wheel_values')
      .limit(1)
    
    if (!testError) {
      console.log('✅ La columna wheel_values ya existe!')
      console.log('No es necesario ejecutar la migración.')
      return
    }
    
    console.log('⚠️  La columna wheel_values no existe, intentando crearla...\n')
    
    // Ejecutamos el SQL para agregar la columna
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: `
        ALTER TABLE sites 
        ADD COLUMN IF NOT EXISTS wheel_values TEXT;
        
        COMMENT ON COLUMN sites.wheel_values IS 'Comma-separated prize values for Fortune Wheel templates (e.g., "$100, $200, $500, $1000")';
      `
    })
    
    if (error) {
      console.error('❌ Error ejecutando SQL:', error.message)
      console.log('\n📝 SOLUCIÓN MANUAL:')
      console.log('Ve a https://supabase.com → Tu proyecto → SQL Editor')
      console.log('Ejecuta este SQL:\n')
      console.log('ALTER TABLE sites ADD COLUMN IF NOT EXISTS wheel_values TEXT;')
      console.log('\nCOMMENT ON COLUMN sites.wheel_values IS \'Comma-separated prize values for Fortune Wheel templates\';')
      process.exit(1)
    }
    
    console.log('✅ Columna wheel_values agregada exitosamente!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n📝 SOLUCIÓN MANUAL:')
    console.log('1. Ve a https://supabase.com')
    console.log('2. Selecciona tu proyecto')
    console.log('3. Ve a SQL Editor')
    console.log('4. Ejecuta este SQL:\n')
    console.log('   ALTER TABLE sites ADD COLUMN IF NOT EXISTS wheel_values TEXT;')
    process.exit(1)
  }
}

addColumn()
