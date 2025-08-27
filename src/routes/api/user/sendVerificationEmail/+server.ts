import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { sendValidationCode } from "../../../../lib/server/email.js";
import { User } from "../../../../lib/server/models/models.js"

export const GET = createDugdemoRequestHandler(async (evt, ctx) => {
    if (!ctx.user) throw {
        status: 401,
        message: "You must be logged in"
    }

    if (ctx.user.verified) throw {
        status: 400,
        message: "You are already verified"
    }

    let msSinceLastEmail = Infinity;

    if (ctx.user.tokenLastSent instanceof Date) {
        msSinceLastEmail = new Date().getTime() - new Date(ctx.user.tokenLastSent).getTime()
    }

    const fifteenMin = (1000*60*15);
    if (msSinceLastEmail < fifteenMin) throw {
        status: 400,
        message: `You must wait ${Math.ceil((fifteenMin-msSinceLastEmail)/1000)} seconds until you can do this again.`
    }

    await User.findByIdAndUpdate(ctx.user._id, { tokenLastSent: new Date() })
    await sendValidationCode(ctx.user.email, ctx.user.verificationToken)

    return {
        message: "Email sent."
    }
}, {
    findUserData: true
})