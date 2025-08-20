import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { traverseTeamForDemo } from "../../../../lib/server/teamTraversal.js";

type DeleteCommentInput = {
    userId: string
    teamId: string
    projectName: string
    trackName: string
    demoName: string
}

export const DELETE = createDugdemoRequestHandler(async (evt, ctx) => {
    const body: DeleteCommentInput = await evt.request.json()
    const { team, track, demoIndex } = await traverseTeamForDemo(ctx.user, body)
    track.demos.splice(demoIndex, 1)
    await (team as any).save()
    return { message: "Demo deleted" }
}, {
    findUserData: true
})