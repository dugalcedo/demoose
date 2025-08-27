import { useMediaDb } from "../../../../../../lib/server/mediaDB.js"
import { createDugdemoRequestHandler } from "../../../../../../lib/server/routeHandling.js"
import { traverseTeamForDemo } from "../../../../../../lib/server/teamTraversal.js"

type GetMp3Params = {
    teamId: string
    projectName: string
    trackName: string
    demoName: string
}

export const GET = createDugdemoRequestHandler(async (evt, ctx) => {

    if (!ctx.user) throw {
        status: 400,
        message: "You must be logged in"
    }

    const params = evt.params as GetMp3Params
    const { user, team, project, track, demo } = await traverseTeamForDemo(ctx.user, params)

    const mediaDB = useMediaDb()
    const { data, error } = await mediaDB.storage.from('mp3s').download(`/${team._id}/${project.name}/${track.name}/${demo.name}.mp3`)

    if (error) {
        console.log(error)
        throw {
            status: 500,
            message: `Failed downloading mp3`
        }
    }

    return {
        _custom: new Response(data, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': `attachment; filename=${demo.name}.mp3`
            }
        })
    }
}, {
    findUserData: true,
    mustBeVerified: true
})