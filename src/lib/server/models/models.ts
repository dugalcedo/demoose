import _UserModel, { type _UserInterface } from "./User.js";
import _TeamModel, { 
    type _TeamInterface,
    type _ProjectInterface,
    type _TrackInterface,
    type _DemoInterface,
    type _InspirationInterface,
    type _CommentInterface
} from "./Team.js";

export const User = _UserModel
export const Team = _TeamModel
export type UserInterface = _UserInterface
export type TeamInterface = _TeamInterface
export type ProjectInterface = _ProjectInterface
export type TrackInterface = _TrackInterface
export type DemoInterface = _DemoInterface
export type CommentInterface = _CommentInterface
export type InspirationInterface = _InspirationInterface

