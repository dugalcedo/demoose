import { Team } from "../../../../lib/server/models/models.js"
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";

type DeleteProjectInput = {
    userId: string
    teamId: string
    projectName: string
}

export const DELETE = createDugdemoRequestHandler(async (evt, ctx) => {

    if (!ctx.user) throw {
        status: 401,
        message: "You must be logged in."
    }

    const body: DeleteProjectInput = await evt.request.json()

    if (!ctx.user._id.equals(body.userId)) throw {
        status: 401,
        message: "You are not a user who is allowed to do this."
    }

    const team = await Team.findById(body.teamId)

    if (!team) throw {
        status: 404,
        message: "Team not found."
    }

    if (!ctx.user._id.equals(team.owner)) throw {
        status: 401,
        message: "You cannot do this because you are not the owner of this team."
    }

    const projectIndex = team.projects.findIndex(p => p.name.toLowerCase() === body.projectName.toLowerCase());

    if (projectIndex < 0) throw {
        status: 404,
        message: "Project not found."
    }

    // Mutation
    team.projects.splice(projectIndex, 1)
    await team.save()

    return {
        message: "Project deleted."
    }
}, {
    findUserData: true
})