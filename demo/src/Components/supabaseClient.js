import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfavrpdbogoxgkzcmdkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmYXZycGRib2dveGdremNtZGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNjM5ODYsImV4cCI6MjA1NDgzOTk4Nn0.ZBPH4-LrQhnq_grucHiKwutcMj0t2OI9-aTFnE7kJDA'; // Replace with your anon API key

export const supabase = createClient(supabaseUrl, supabaseKey);
