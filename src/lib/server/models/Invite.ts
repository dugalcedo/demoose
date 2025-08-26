import { Schema, Types, model, type HydratedDocument } from "mongoose";
import { createCollectionName } from "./util.js"

export interface _InviteInterface {
    _id: Types.ObjectId
    inviter: Types.ObjectId
    invitee: Types.ObjectId
    team: Types.ObjectId
    status: 'pending' | 'accepted' | 'rejected'
}

const InviteSchema = new Schema<_InviteInterface>({
    inviter: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    invitee: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'team',
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
})

export const _InviteModel = model<_InviteInterface>('invite', InviteSchema, createCollectionName('invites'))

export type _InviteType = HydratedDocument<_InviteInterface>
