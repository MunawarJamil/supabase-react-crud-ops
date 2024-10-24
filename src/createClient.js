import {createClient} from '@supabase/supabase-js'

const apiUrl =  "https://oheareirwvqefcvleixe.supabase.co"
const apiKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZWFyZWlyd3ZxZWZjdmxlaXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2ODYxNTYsImV4cCI6MjA0NTI2MjE1Nn0.i7xVFTtEbaDuLQ15rPxsXPuFArW8pogRuNfXIfZMwRM" 
 export const supabase = createClient(apiUrl, apiKey)
   