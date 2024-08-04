export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Missing Supabase keys');

export const environment = {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
};
