import dotenv from 'dotenv'
dotenv.config()
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js";
import { User } from "../../../../lib/server/models/models.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const BAD_LOGIN_ERROR = { status: 401, error: true, message: `Invalid credentials.` }

export const POST = createDugdemoRequestHandler(async (evt) => {
    if (!process.env.JWT_SECRET) throw {
        status: 503,
        error: true,
        message: 'Database down.'
    }

    const formData = await evt.request.json()

    const foundUser = await User.findOne({ email: formData.email })
    if (!foundUser) return BAD_LOGIN_ERROR
    const validPwd = await bcrypt.compare(formData.password, foundUser.password)
    if (!validPwd) return BAD_LOGIN_ERROR
    const token = jwt.sign({ _id: foundUser._id }, process.env.JWT_SECRET)
    evt.cookies.set('dugdemotoken', token, {
        path: "/",
        maxAge: 3600*24*30,
        httpOnly: false
    })

    return {
        message: "User found",
        data: {
            token
        }
    }
})