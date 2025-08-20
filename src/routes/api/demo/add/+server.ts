import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { Team } from "../../../../lib/server/models/models.js";

type CreateDemoInput = {
    userId: string
    teamId: string
    projectName: string
    trackName: string
    name: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {
    if (!ctx.user) throw {
        status: 401,
        message: "You must be logged in to do this."
    }

    const body: CreateDemoInput = await evt.request.json()

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

    const track = project.tracks.find(t => t.name.toLowerCase() === body.trackName.toLowerCase());

    if (!track) throw {
        status: 404,
        message: "Track not found"
    }

    const existingDemo = track.demos.find(d => d.name.toLowerCase() === body.name.toLowerCase());
    if (existingDemo) throw {
        status: 401,
        message: `This track already has a demo called ${existingDemo.name}`
    }

    // Mutation
    track.demos.push({
        name: body.name.toLowerCase(),
        date: new Date(),
        comments: [],
        inspirations: []        
    })
    await team.save()

    return {
        status: 201,
        message: "Demo added"
    }

}, {
    findUserData: true,
    mustBeVerified: true
})