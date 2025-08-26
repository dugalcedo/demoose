import dotenv from 'dotenv'
dotenv.config()
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { User } from "../../../../lib/server/models/models.js";
import jwt from 'jsonwebtoken'

type JoinInput = {
    email: string
    password: string
    password2: string
    displayName: string
}

export const POST = createDugdemoRequestHandler(async (evt) => {
    if (!process.env.JWT_SECRET) throw {
        status: 503,
        error: true,
        message: 'Database down.'
    }

    const formData: JoinInput = await evt.request.json()
    const newUser = await User.create({
        email: formData.email,
        displayName: formData.displayName.toLowerCase(),
        password: formData.password
    })

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