import { Json } from '@/database.types';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const supabase = createSupabaseServerClient();

export const get_my_claims = async () => {
    return await supabase
        .rpc('get_my_claims', {})
        .throwOnError()
        .then((res) => res.data);
};

export const get_my_claim = async (claim: string) => {
    return await supabase
        .rpc('get_my_claim', { claim })
        .throwOnError()
        .then((res) => res.data);
};

export const is_claims_admin = async () => {
    return await supabase
        .rpc('is_claims_admin', {})
        .throwOnError()
        .then((res) => res.data);
};

// Admin-only claim operations
export const get_claims = async (uid: string) => {
    return await supabase
        .rpc('get_claims', { uid })
        .throwOnError()
        .then((res) => res.data);
};

export const get_claim = async (uid: string, claim: string) => {
    return await supabase
        .rpc('get_claim', { uid, claim })
        .throwOnError()
        .then((res) => res.data);
};

export const set_claim = async (uid: string, claim: string, value: Json) => {
    return await supabase
        .rpc('set_claim', { uid, claim, value })
        .throwOnError()
        .then((res) => res.data);
};

export const delete_claim = async (uid: string, claim: string) => {
    return await supabase
        .rpc('delete_claim', { uid, claim })
        .throwOnError()
        .then((res) => res.data);
};
