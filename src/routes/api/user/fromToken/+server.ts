import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { Team } from "../../../../lib/server/models/models.js";

export const GET = createDugdemoRequestHandler(async (evt, ctx) => {

    if (!ctx.user) throw { status: 401, error: true, message: "You are not logged in." }

    const teams = await Team.find({ members: { $in: ctx.user._id } }) 

    const userData = {
        ...ctx.user,
        teams
    }

    return {
        message: `User data retrieved.`,
        data: userData
    }
    
}, {
    findUserData: true
})