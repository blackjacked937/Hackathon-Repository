// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://thsifpigyjwpqurbyeir.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoc2lmcGlneWp3cHF1cmJ5ZWlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1ODI1NTIsImV4cCI6MjA3NDE1ODU1Mn0.vSwtzq9MF1_uDdtSG2dg0Yoe1rwdWsaZuXAow_pXGZ4"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
