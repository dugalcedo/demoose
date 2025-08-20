import { 
    User, 
    Team, 
    type UserInterface,
    type TeamInterface,
    type ProjectInterface,
    type TrackInterface,
    type DemoInterface,
    type InspirationInterface,
    type CommentInterface
} from "./models/models.js";

import {
    type TeamRole,
    verifyTeamRole
} from './teamRoleVerification.js'

type TeamTraversalOptions = {
    requiredTeamRole: TeamRole
}

type TeamTraversalFunction<Input, Output> = (user: UserInterface | null |  undefined, body: Input, options?: TeamTraversalOptions) => Promise<Output>;

////////// TEAM

type TeamInput = { teamId: string }
type TeamOutput = { user: UserInterface, team: TeamInterface}
export const getTeamAndUser: TeamTraversalFunction<TeamInput, TeamOutput> = async (user, body, options) => {
    if (!user) throw { status: 401, message: "You must be logged in" }
    const team = await Team.findById(body.teamId)
    if (!team) throw { status: 404, message: "Team not found" }
    if (options?.requiredTeamRole) await verifyTeamRole(user, body.teamId, options.requiredTeamRole)
    return { team, user }
}


///////// PROJECT

type ProjectInput = { teamId: string, projectName: string }
type ProjectOutput = TeamOutput & { project: ProjectInterface, projectIndex: number }
export const traverseTeamForProject: TeamTraversalFunction<ProjectInput, ProjectOutput> = async (user, body, options) => {
    const { user: forSureUser, team } = await getTeamAndUser(user, body, options)
    const projectIndex = team.projects.findIndex(p => p.name.toLowerCase() === body.projectName.toLowerCase())
    if (projectIndex < 0) throw { status: 404, message: "Project not found" }
    return { user: forSureUser, team, projectIndex, project: team.projects[projectIndex] }
}

////////// TRACK

type TrackInput = ProjectInput & { trackName: string }
type TrackOutput = ProjectOutput & { track: TrackInterface, trackIndex: number }
export const traverseTeamForTrack: TeamTraversalFunction<TrackInput, TrackOutput> = async (user, body, options) => {
    const data = await traverseTeamForProject(user, body, options)
    const trackIndex = data.project.tracks.findIndex(t => t.name.toLowerCase() === body.trackName.toLowerCase())
    if (trackIndex < 0) throw { status: 404, message: "Track not found" }
    return { ...data, trackIndex, track: data.project.tracks[trackIndex] }
}

////////// DEMO

type DemoInput = TrackInput & { demoName: string }
type DemoOutput = TrackOutput & { demo: DemoInterface, demoIndex: number }
export const traverseTeamForDemo: TeamTraversalFunction<DemoInput, DemoOutput> = async (user, body, options) => {
    const data = await traverseTeamForTrack(user, body, options)
    const demoIndex = data.track.demos.findIndex(d => d.name.toLowerCase() === body.demoName.toLowerCase())
    if (demoIndex < 0) throw { status: 404, message: "Demo not found" }
    return { ...data, demoIndex, demo: data.track.demos[demoIndex] }
}

////////// COMMENT

type CommentInput = DemoInput & { commentId: string }
type CommentOutput = DemoOutput & { comment: CommentInterface, commentIndex: number }
export const traverseTeamForComment: TeamTraversalFunction<CommentInput, CommentOutput> = async (user, body, options) => {
    const data = await traverseTeamForDemo(user, body, options)
    const commentIndex = data.demo.comments.findIndex(c => c._id.equals(body.commentId))
    if (commentIndex < 0) throw { status: 404, message: "Comment not found" }
    return { ...data, commentIndex, comment: data.demo.comments[commentIndex] }
}

////////// INSPIRATION

type InspirationInput = DemoInput & { inspirationId: string }
type InspirationOutput = DemoOutput & { inspiration: InspirationInterface, inspirationIndex: number }
export const traverseTeamForInspiration: TeamTraversalFunction<InspirationInput, InspirationOutput> = async (user, body, options) => {
    const data = await traverseTeamForDemo(user, body, options)
    const inspirationIndex = data.demo.inspirations.findIndex(i => i._id.equals(body.inspirationId))
    if (inspirationIndex < 0) throw { status: 404, message: "Inspiration not found" }
    return { ...data, inspirationIndex, inspiration: data.demo.inspirations[inspirationIndex] }
}