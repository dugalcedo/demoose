import { createDugdemoRequestHandler } from "../../../lib/server/routeHandling.js";
import { User } from "../../../lib/server/models/models.js";

export const GET = createDugdemoRequestHandler(async (evt, ctx) => {
    const users = await User.find()
    return {
        message: "Welcome back sir",
        data: {
            users: users.map((user) => user.toJSON())
        }
    }
}, {
    findUserData: true,
    mustBeAdmin: true
})