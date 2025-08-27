import dotenv from 'dotenv'; dotenv.config();
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js"
import { useMediaDb } from '../../../../lib/server/mediaDB.js';
import { User } from '../../../../lib/server/models/models.js';
import bcrypt from 'bcrypt'

export const GET = createDugdemoRequestHandler(async (evt) => {
    if (process.env.PROD) throw {
        status: 404,
        message: "Not found"
    }

    const admin_key = new URL(evt.url).searchParams.get('admin_key')
    if (admin_key != process.env.ADMIN_PWD) throw {
        status: 404,
        message: "Not found"
    }

    await test()

    return {
        message: "meow"
    }
})

async function test() {

}