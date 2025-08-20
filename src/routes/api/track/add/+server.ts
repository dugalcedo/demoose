import { Team } from "../../../../lib/server/models/models.js"
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";

type CreateTrackInput = {
    userId: string
    teamId: string
    projectName: string
    name: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {

    if (!ctx.user) throw {
        status: 401,
        message: "You must be logged in to do this."
    }

    const body: CreateTrackInput = await evt.request.json()

    if (!ctx.user._id.equals(body.userId)) throw {
        status: 401,
        message: "You are not a user who is allowed to do this."
    }

    const team = await Team.findById(body.teamId)

    if (!team) throw {
        status: 404,
        message: "Team not found."
    }

    if (!team.members.map(id => id.toString()).includes(body.userId)) throw {
        status: 404,
        message: "You are not a member of this team."
    }

    const projectIndex = team.projects.findIndex(p => p.name.toLowerCase() === body.projectName.toLowerCase())

    if (projectIndex < 0) throw {
        status: 404,
        message: "Project not found."
    }

    const project = team.projects[projectIndex]!;

    const existingTrack = project.tracks.find(t => t.name.toLowerCase() === body.name.toLowerCase());
    
    if (existingTrack) throw {
        status: 400,
        message: `This project already has a track called "${existingTrack.name}".`
    }

    // Mutation
    project.tracks.push({
        name: body.name.toLowerCase(),
        demos: []
    })
    await team.save()

    return {
        status: 201,
        message: "Track created."
    }

}, {
    findUserData: true,
    mustBeVerified: true
})