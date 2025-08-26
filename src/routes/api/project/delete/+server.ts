import { Team } from "../../../../lib/server/models/models.js"
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { traverseTeamForProject } from "../../../../lib/server/teamTraversal.js"

type DeleteProjectInput = {
    userId: string
    teamId: string
    projectName: string
}

export const DELETE = createDugdemoRequestHandler(async (evt, ctx) => {
    const body: DeleteProjectInput = await evt.request.json()
    const { team, projectIndex } = await traverseTeamForProject(ctx.user, body, { requiredTeamRole: 'owner' })
    team.projects.splice(projectIndex, 1)
    await team.save()
    return { message: "Project deleted." }
}, {
    findUserData: true
})