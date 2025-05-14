import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ihxapqpcoujpevlugazu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeGFwcXBjb3VqcGV2bHVnYXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNzc5MjIsImV4cCI6MjA2Mjc1MzkyMn0.B_lZlfiQ20lyWM4pUnwBUg_zTNrLxzMMH6XsrF1Zx6c';

export const supabase = createClient(supabaseUrl, supabaseKey); 