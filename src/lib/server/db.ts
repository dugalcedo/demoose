import { connect, type Mongoose } from "mongoose"
import dotenv from 'dotenv'; dotenv.config()

let db: Mongoose | undefined = undefined;

export async function useDB(): Promise<boolean> {
    const uri = process.env.MONGODB_URI

    if (!uri) throw new Error("Missing database URI.")

    if (db) return true;

    try {    
        db = await connect(uri)
        console.log(`Successfuly connected.`)
        return true
    } catch (error) {
        console.log(error)
        console.log(`Failed connecting to MongoDB.`)
        return false
    }

}