import { Invite, Team } from "../../../../lib/server/models/models.js"
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js"

export const GET = createDugdemoRequestHandler(async (evt, ctx) => {
    if (!ctx.user) throw {
        status: 401,
        message: `You must be logged in.`
    }

    const teamId = new URL(evt.url).searchParams.get('teamId')
    
    if (!teamId) throw {
        status: 400,
        message: `Missing teamId in URL search parameters.`
    }

    const team = await Team.findById(teamId)

    if (!team) throw {
        status: 404,
        message: `Team not found`
    }

    const isMember = team.members.map(mem => mem._id.toString()).includes(ctx.user._id.toString());
    if (!isMember) throw {
        status: 401,
        message: `You are not a member of this team`
    }

    const invites = await Invite.find({ team: team._id })
        .populate({ path: 'inviter', select: ['-password', '-verificationToken'] })
        .populate({ path: 'invitee', select: ['-password', '-verificationToken'] })
        .populate('team')

    if (!invites.length) throw {
        status: 404,
        message: `No invites found`
    }

    return {
        message: `Invites retrieved.`,
        data: invites
    }
},
{
    findUserData: true
})