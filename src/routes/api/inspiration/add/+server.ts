import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { traverseTeamForDemo } from "../../../../lib/server/teamTraversal.js"
import { Types } from "mongoose";

type AddInspirationInput = {
    userId: string
    teamId: string
    projectName: string
    trackName: string
    demoName: string
    description: string
    url?: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {

    const body: AddInspirationInput = await evt.request.json()
    const { team, demo } = await traverseTeamForDemo(ctx.user, body)

    demo.inspirations.push({
        _id: new Types.ObjectId(),
        description: body.description,
        url: body.url
    })

    await team.save()

    return {
        message: "Inspiration added"
    }

}, {
    findUserData: true,
    mustBeVerified: true
})