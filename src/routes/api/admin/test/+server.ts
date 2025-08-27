import dotenv from 'dotenv'; dotenv.config();
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js"
import { useMediaDb } from '../../../../lib/server/mediaDB.js';

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
    const mediaDb = useMediaDb()
    const mp3Data = Buffer.from([
        0xFF, 0xFB, 0x90, 0x64, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ])
    const { data, error } = await mediaDb.storage
        .from('mp3s')
        .upload('test/test.mp3', mp3Data, { contentType: 'audio/mpeg' })

    console.log({ data, error })
}