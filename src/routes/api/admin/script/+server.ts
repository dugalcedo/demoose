import dotenv from 'dotenv'
dotenv.config()

import { createDugdemoRequestHandler } from '../../../../lib/server/routeHandling.js'

export const GET = createDugdemoRequestHandler(async () => {
    if (process.env.PROD) throw {
        status: 403,
        message: "Cannot run scripts in production mode."
    }

    await script()

    return {
        message: "Script ran.",
        status: 200
    }
}, {
    mustBeAdmin: true
})

////////////////////////////

import { Team } from '../../../../lib/server/models/models.js'

async function script() {
    // await Team.deleteMany()
}