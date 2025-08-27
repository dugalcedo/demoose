import { sendResetEmail } from "../../../../lib/server/email.js"
import { User } from "../../../../lib/server/models/models.js"
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js"
import { v4 } from "uuid"

type ResetEmailBody = {
    email: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {
    const body: ResetEmailBody = await evt.request.json()
    const user = await User.findOne({ email: body.email })

    if (!user) throw {
        error: 500,
        message: `Something went wrong`
    }

    user.resetEmailToken = v4()
    await user.save()
    await sendResetEmail(body.email, user.resetEmailToken)

    return {
        message: `Email sent`
    }
})