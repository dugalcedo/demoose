import { User } from "../../../../lib/server/models/models.js"
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js"
import bcrypt from 'bcrypt'

type ResetPwdBody = {
    code: string
    password: string
    password2: string
}

export const PUT = createDugdemoRequestHandler(async (evt, ctx) => {
    const body: ResetPwdBody = await evt.request.json()
    const user = await User.findOne({ resetEmailToken: body.code })

    if (!user) throw {
        error: 404,
        message: "Invalid URL."
    }


    user.password = await bcrypt.hash(body.password, 7)
    user.resetEmailToken = undefined
    await user.save()

    return {
        message: "Password changed"
    }
})