import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Basic connection test
if (typeof window !== 'undefined') {
  supabase
    .from('olay')
    .select('*')
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.error('Supabase connection error:', error);
      } else {
        console.log('Supabase connection successful, test query result:', data);
      }
    });
}

// Test connection and list all tables
const testConnection = async () => {
  try {
    // Test basic connection
    const { data: tableList, error: tablesError } = await supabase
      .from('olay')
      .select('*')
      .limit(1);

    if (tablesError) {
      console.error('Failed to connect to Supabase:', tablesError);
      return;
    }

    console.log('Successfully connected to Supabase');
    console.log('Sample data from olay table:', tableList);

    // Test each table
    const tables = ['olay', 'dogum', 'olum', 'tatil'];
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      console.log(`Table ${table} check:`, {
        exists: !error,
        error: error ? error.message : null,
        data
      });
    }
  } catch (err) {
    console.error('Supabase connection test failed:', err);
  }
};

testConnection(); 