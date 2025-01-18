import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dhgzsgzsgxviuookdktq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZ3pzZ3pzZ3h2aXVvb2tka3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNDQ2MDksImV4cCI6MjA1MjcyMDYwOX0.A50slf44aULgtpU8eqWzUW3tYDy5VIyq5nuD_g8OXAI'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
) 