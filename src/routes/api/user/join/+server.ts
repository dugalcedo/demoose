import dotenv from 'dotenv'
dotenv.config()
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { User } from "../../../../lib/server/models/models.js";
import jwt from 'jsonwebtoken'

export const POST = createDugdemoRequestHandler(async (evt) => {
    if (!process.env.JWT_SECRET) throw {
        status: 503,
        error: true,
        message: 'Database down.'
    }

    const formData = await evt.request.json()
    const newUser = await User.create(formData)
    const token = jwt.sign(
        { _id: newUser._id },
        process.env.JWT_SECRET
    )
    evt.cookies.set('dugdemotoken', token, {
        path: "/",
        maxAge: 3600*24*30,
        httpOnly: false
    })

    return {
        message: "User created",
        data: {
            token
        }
    }
})