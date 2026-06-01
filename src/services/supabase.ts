import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kiuhfpmlajkdnnjohcgl.supabase.co";
const supabaseKey = "sb_publishable_Q1KisZbwHwPf5_-QWXjvrw_7vA-BAsY";

export const supabase = createClient(supabaseUrl, supabaseKey);