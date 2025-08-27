import { Schema, Types, model, type HydratedDocument } from "mongoose";
import { createCollectionName } from "./util.js"

export interface _VerificationInterface {
    _id: Types.ObjectId
    user: Types.ObjectId
    code: string
    lastEmailSent?: Date
}

const VerificationSchema = new Schema<_VerificationInterface>({
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

export const _VerificationModel = model<_VerificationInterface>('verification', VerificationSchema, createCollectionName('verifications'))
export type _VerificationType = HydratedDocument<_VerificationInterface>