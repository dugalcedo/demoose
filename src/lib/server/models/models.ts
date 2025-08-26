import _UserModel, { type _UserInterface, type _UserType } from "./User.js";
import _TeamModel, { 
    type _TeamInterface,
    type _ProjectInterface,
    type _TrackInterface,
    type _DemoInterface,
    type _InspirationInterface,
    type _CommentInterface,
    type _TeamType
} from "./Team.js";
import { _InviteModel, type _InviteType, type _InviteInterface } from "./Invite.js";

export const User = _UserModel
export const Team = _TeamModel
export const Invite = _InviteModel
export type UserInterface = _UserInterface
export type TeamInterface = _TeamInterface
export type InviteInterface = _InviteInterface
export type UserType = _UserType
export type TeamType = _TeamType
export type InviteType = _InviteType
export type ProjectInterface = _ProjectInterface
export type TrackInterface = _TrackInterface
export type DemoInterface = _DemoInterface
export type CommentInterface = _CommentInterface
export type InspirationInterface = _InspirationInterface

