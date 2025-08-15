import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { Team } from "../../../../lib/server/models/models.js";

export const GET = createDugdemoRequestHandler(async () => {
    const teams = await Team.find({})
    return {
        data: teams
    }
})