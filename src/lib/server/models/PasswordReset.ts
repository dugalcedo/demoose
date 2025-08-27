import { Schema, Types, model, type HydratedDocument } from "mongoose";
import { createCollectionName } from "./util.js"

export interface _PasswordResetInterface {
    _id: Types.ObjectId
    user: Types.ObjectId
    code: string
    lastEmailSent?: Date
}

const PasswordResetSchema = new Schema<_PasswordResetInterface>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    lastEmailSent: {
        type: Date,
    }
})

export const _PasswordResetModel = model<_PasswordResetInterface>('passwordReset', PasswordResetSchema, createCollectionName('passwordResets'))
export type _PasswordResetType = HydratedDocument<_PasswordResetInterface>