import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { useMediaDb } from "../../../../lib/server/mediaDB.js";
import { traverseTeamForDemo } from "../../../../lib/server/teamTraversal.js"

type UploadMp3Input = {
    userId: string
    teamId: string
    projectName: string
    trackName: string
    demoName: string
    file: File
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {
    const body = Object.fromEntries(await evt.request.formData()) as UploadMp3Input;

    const { user, team, project, track, demo } = await traverseTeamForDemo(ctx.user, body)

    let sizeLimit = 0
    switch (user.tier) {
        case 'deer':
            sizeLimit = 0
            break
        case 'wapiti':
            sizeLimit = 10_000_000
            break
        case 'admin':
        case 'moose':
            sizeLimit = 30_000_000
            break
    }

    if (body.file.size > sizeLimit) throw {
        status: 401,
        message: `This file is greater than your allowed limit of ${(sizeLimit/1_000_000).toFixed(2)}MB`
    }

    if (body.file.size < 50000) throw {
        status: 401,
        message: `The file must be at least 5kb.`
    }

    const mediaDb = useMediaDb()
    const upload_url = `/${team._id}/${project.name}/${track.name}/${demo.name}.mp3`
    const { error } = await mediaDb.storage
        .from('mp3s')
        .upload(upload_url, body.file, { contentType: 'audio/mpeg' })

    if (error) {
        console.log(`FAILED FILE UPLOAD`)
        console.log(error)
        throw {
            status: 500,
            message: `Upload failed`
        }
    }

    demo.has_upload = true
    await team.save()

    return {
        message: "File uploaded"
    }
}, {
    findUserData: true,
    mustBeVerified: true
})