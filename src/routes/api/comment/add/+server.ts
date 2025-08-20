import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { traverseTeamForDemo } from "../../../../lib/server/teamTraversal.js"
import { Types } from "mongoose"

type AddCommentInput = {
    userId: string
    teamId: string
    projectName: string
    trackName: string
    demoName: string
    body: string
    timestamp: number
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {
    const body: AddCommentInput = await evt.request.json()
    const { team, user, demo } = await traverseTeamForDemo(ctx.user, body, { requiredTeamRole: 'member' })
    demo.comments.push({
        _id: new Types.ObjectId(),
        body: body.body,
        author: user._id,
        date: new Date(),
        timestamp: body.timestamp
    })
    await (team as any).save()
    return {
        message: "Comment added"
    }
}, {
    findUserData: true,
    mustBeVerified: true
})