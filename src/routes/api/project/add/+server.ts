import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { Team, User } from "../../../../lib/server/models/models.js";
import { getTeamAndUser } from "../../../../lib/server/teamTraversal.js";

type AddProjectInput = {
    name: string
    teamId: string
    userId: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {

    const body: AddProjectInput = await evt.request.json()
    const { team, user } = await getTeamAndUser(ctx.user, body)

    const existingProject = team.projects.find(p => p.name.toLowerCase() === body.name.toLowerCase());
    if (existingProject) throw {
        status: 401,
        message: `You already have a team called "${body.name.toLowerCase()}"`
    }

    const newProject = {
        name: body.name.toLowerCase(),
        mods: [user._id],
        tracks: []
    }

    team.projects.push(newProject)
    await (team as any).save()

    return {
        message: `Project created`,
        data: newProject
    }
}, {
    findUserData: true
})