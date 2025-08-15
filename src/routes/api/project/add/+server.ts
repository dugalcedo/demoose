import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { Team, User } from "../../../../lib/server/models/models.js";


type AddProjectInput = {
    name: string
    teamId: string
    userId: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {
    if (!ctx.user) throw {
        status: 401,
        message: "You must be logged in."
    }

    const body: AddProjectInput = await evt.request.json()

    if (!ctx.user._id.equals(body.userId)) throw {
        status: 401,
        message: "You are not allowed to edit this user."
    }

    const team = await Team.findById(body.teamId)

    if (!team) throw {
        status: 404,
        message: "Team not found."
    }

    const existingProject = team.projects.find(p => p.name.toLowerCase() === body.name.toLowerCase());
    if (existingProject) throw {
        status: 401,
        message: `You already have a team called "${body.name.toLowerCase()}"`
    }

    const newProject = {
        name: body.name.toLowerCase(),
        mods: [ctx.user._id],
        tracks: []
    }

    team.projects.push(newProject)
    await team.save()

    return {
        message: `Project created`,
        data: newProject
    }
}, {
    findUserData: true
})