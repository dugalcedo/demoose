import dotenv from 'dotenv'
dotenv.config()
import { User, Team } from "../lib/server/models/models.js"
import jwt from 'jsonwebtoken'
import type { Data, UserData, Team as TeamT, Project, Track, Demo, UnverifiedUserData } from '../lib/types.js'
import { useDB } from '../lib/server/db.js'

export const load = async (ctx): Promise<Data> => {
    await useDB()

    let userData: UserData | undefined 
    let team: TeamT | undefined
    let project: Project | undefined
    let track: Track | undefined
    let isTeamOwner: boolean | undefined
    let demo: Demo | undefined
    let unverifiedUserData: UnverifiedUserData | undefined

    const token = ctx.cookies.get('dugdemotoken')

    if (token) {
        try {
            // GET USER DATA
            const payload = jwt.verify(token, process.env.JWT_SECRET || "")
            if (typeof payload === 'string') throw null;

            const user = await User.findById(payload._id)
            if (!user) throw null;

            if (!user.verified) {
                let msSinceLastEmail = Infinity

                if (user.tokenLastSent instanceof Date) {
                    msSinceLastEmail = new Date().getTime() - new Date(user.tokenLastSent).getTime()
                }

                unverifiedUserData = {
                    _id: user._id.toString(),
                    displayName: user.displayName,
                    email: user.email,
                    tokenLastSent: user.tokenLastSent,
                    msSinceLastEmail
                }
                throw null
            };

            const teams = await Team.find({ members: { $in: user._id }})
            userData = {
                _id: user._id.toString(),
                email: user.email,
                displayName: user.displayName,
                teams: JSON.parse(JSON.stringify(teams)),
                verified: user.verified,
                tokenLastSent: user.tokenLastSent
            }

            // find team
            if (ctx.params.teamId) {
                team = userData.teams.find(t => t._id === ctx.params.teamId)
            }

            // find isTeamOwner
            if (team) {
                isTeamOwner = team.owner === userData._id
            }

            // find project
            if (team && ctx.params.projectName) {
                project = team.projects.find(p => p.name.toLowerCase() === ctx.params.projectName?.toLowerCase())
            }

            // find track
            if (team && project && ctx.params.trackName) {
                track = project.tracks.find(t => t.name.toLowerCase() === ctx.params.trackName?.toLowerCase())
            }

            // find demo
            if (team && project && track && ctx.params.demoName) {
                demo = track.demos.find(d => d.name.toLowerCase() === ctx.params.demoName?.toLowerCase())
            }
        } catch (err) {
            console.log(err)
        }
    }

    return {
        userData,
        params: ctx.params,
        team,
        project,
        track,
        isTeamOwner,
        demo,
        unverifiedUserData
    }
}