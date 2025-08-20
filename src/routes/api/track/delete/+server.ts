import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { traverseTeamForTrack } from "../../../../lib/server/teamTraversal.js"

type DeleteTrackBody = {
    userId: string
    teamId: string
    projectName: string
    trackName: string
    demoName: string
}

export const DELETE = createDugdemoRequestHandler(async (evt, ctx) => {
    const body: DeleteTrackBody = await evt.request.json()
    const { team, project, trackIndex } = await traverseTeamForTrack(ctx.user, body)
    project.tracks.splice(trackIndex, 1)
    await (team as any).save()
    return { message: "Track deleted" }
}, {
    findUserData: true,
    mustBeVerified: true
})