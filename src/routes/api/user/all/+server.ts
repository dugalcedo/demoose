import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { User } from "../../../../lib/server/models/models.js";

export const GET = createDugdemoRequestHandler(async () => {
    const users = await User.find({})
    return {
        data: users,
        message: "Users retrieved"
    }
})