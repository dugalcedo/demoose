import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { Team } from "../../../../lib/server/models/models.js";

type AddTeamInput = {
    userId: string
    name: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {

    if (!ctx.user) throw {
        status: 401,
        message: "You must be logged in"
    }

    const body: AddTeamInput = await evt.request.json()
    body.name = body.name.toLowerCase().trim().replaceAll(/\s+/gm, " ")

    const userTeams = await Team.find({ members: { $in: ctx.user._id }})
    const existingTeam = userTeams.find(t => t.name.toLowerCase() == body.name)


    if (existingTeam) throw {
        status: 401,
        message: `There is already a team called "${body.name}"`
    }

    const newTeam = await Team.create({
        name: body.name,
        creator: body.userId,
        owner: body.userId,
        mods: [body.userId],
        members: [body.userId],
        projects: []
    })

    return {
        message: "Team added",
        data: newTeam
    }
}, {
    findUserData: true,
    mustBeVerified: true
})