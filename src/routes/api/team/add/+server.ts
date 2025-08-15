import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { Team } from "../../../../lib/server/models/models.js";

type AddTeamInput = {
    userId: string
    name: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {
    if (!ctx.user) throw {
        message: "You must be logged in.",
        status: 401
    }

    const body: AddTeamInput = await evt.request.json()
    console.log(body)

    const userIsSelf = ctx.user._id.equals(body.userId)

    if (!userIsSelf) throw {
        message: "You are not allowed to do this.",
        status: 401
    }

    const newTeam = await Team.create({
        name: body.name,
        creator: ctx.user._id,
        owner: ctx.user._id,
        members: [ctx.user._id],
        mods: [ctx.user._id]
    })

    return {
        status: 201,
        message: "Team created",
        data: newTeam.toObject()
    }

}, {
    findUserData: true
})