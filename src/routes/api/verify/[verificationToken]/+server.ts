import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { User } from "../../../../lib/server/models/models.js";

export const GET = createDugdemoRequestHandler(async (evt, ctx) => {
    const { verificationToken } = evt.params

    if (!verificationToken) throw {
        status: 400,
        message: "Invalid verification token."
    }

    const user = await User.findOne({ verificationToken })

    if (!user) throw {
        status: 400,
        message: "Invalid verification token."
    }

    if (user.verified) throw {
        status: 400,
        message: "You are already verified."
    }

    user.verified = true
    await user.save()

    return {
        message: "User verified."
    }
})