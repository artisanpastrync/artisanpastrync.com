import 'server-only';

import { createClient } from '@supabase/supabase-js';

import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from '@/config/environment';
import { Database } from '@/database.types';

/** Use admin on server-side to avoid triggering dynamic rendering or bypass RLS. No user, no RLS. */
export function createSupabaseAdminClient() {
    return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}
