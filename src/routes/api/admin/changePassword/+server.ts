import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { User } from "../../../../lib/server/models/models.js";

export const PUT = createDugdemoRequestHandler(async (evt) => {
    const body = await evt.request.json()
    await User.findByIdAndUpdate(body._id, { password: body.password })
    return {
        message: "Password updated."
    }
})