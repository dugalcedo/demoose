import dotenv from 'dotenv'; dotenv.config()
import { type SupabaseClient, createClient } from "@supabase/supabase-js";

let mediaDb: SupabaseClient | undefined;
export const useMediaDb = () => {
    if (mediaDb) return mediaDb

    try {
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) throw {
            status: 503,
            message: "Database down"
        }


        mediaDb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
        return mediaDb
    } catch (error) {
        console.log(`FAILED CONNECTING TO MEDIADB`)
        console.log(error)
        throw error
    }
}