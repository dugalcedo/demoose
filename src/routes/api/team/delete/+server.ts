import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { Team } from "../../../../lib/server/models/models.js";

type DeleteTeamInput = {
    teamId: string
}

export const DELETE = createDugdemoRequestHandler(async (evt, ctx) => {

    if (!ctx.user) throw {
        message: "You must be logged in."
    }

    const body: DeleteTeamInput = await evt.request.json()

    const team = await Team.findById(body.teamId)

    if (!team) throw {
        status: 404,
        message: "Team not found"
    }

    if (!team.owner.equals(ctx.user._id)) throw {
        status: 401,
        message: "You are not the owner of this team."
    }

    await Team.findByIdAndDelete(body.teamId)

    return {
        message: "Team deleted"
    }

}, {
    findUserData: true
})