import { Schema, model, Types, type HydratedDocument } from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { createCollectionName } from "./util.js";

export interface _UserInterface {
    _id: Types.ObjectId
    email: string
    displayName: string
    password: string
    verificationToken: string
    verified: boolean
    tokenLastSent: Date
}

const UserSchema = new Schema<_UserInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(v: string) {
                return validator.isEmail(v)
            },
            message: "Invalid email"
        }
    },
    displayName: {
        type: String,
        required: true,
        unique: true,
        length: [2, 32],
        trim: true,
        validate: [
            {message: "Display name cannot contain spaces.", validator: (v: string) => !v.includes(' ')}
        ]
    },
    password: {
        type: String,
        length: [8, 64],
        required: true,
        validate: {
            validator(v: string) {
                return validator.isStrongPassword(v)
            },
            message: `Password must be at between 8 and 64 characters and contain one of each: lowercase, uppercase, number, symbol.`
        }
    },
    verificationToken: {
        type: String
    },
    tokenLastSent: {
        type: Date
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
})


UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 8)
    this.verificationToken = v4()
    next()
})

const _UserModel = model<_UserInterface>('user', UserSchema, createCollectionName('users'))

export type _UserType = HydratedDocument<_UserInterface>

export default _UserModel
