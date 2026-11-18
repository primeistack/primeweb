import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://wzwmjgttodgnwjuuuavn.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_djdSrcJNkBFeD-hFyPO3WQ_K6XUmaGq'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
