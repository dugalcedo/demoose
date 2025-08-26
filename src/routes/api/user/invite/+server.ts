import { Invite, User } from "../../../../lib/server/models/models.js"
import { createDugdemoRequestHandler } from "../../../../lib/server/routeHandling.js"
import { getTeamAndUser } from "../../../../lib/server/teamTraversal.js"

type InviteInput = {
    inviter: string
    teamId: string
    invitee: string
}

export const POST = createDugdemoRequestHandler(async (evt, ctx) => {
    const body: InviteInput = await evt.request.json()
    const { user, team } = await getTeamAndUser(ctx.user, body)

    if (!user._id.equals(body.inviter)) throw {
        status: 401,
        message: "You are not allowed to invite on behalf of another user."
    }

    // get role
    let role = "member"
    if (team.owner.equals(body.inviter)) role = "owner";
    else if (team.mods.map(id => id.toString()).includes(body.inviter)) role = "mod";

    if (role === 'member') throw {
        status: 401,
        message: "You must be a mod or owner of a team to invite people to it."
    }

    const invitee = await User.findOne({ displayName: body.invitee.toLowerCase() })
    if (!invitee) throw {
        status: 404,
        message: `No user found for display name "${body.invitee}"`
    }

    if (invitee._id.equals(body.inviter)) throw {
        status: 401,
        message: `You cannot invite yourself`
    }

    const existingInvite = await Invite.findOne({
        inviter: body.inviter,
        invitee: invitee._id,
        team: body.teamId
    })
    
    if (existingInvite?.status === 'accepted') throw {
        status: 400,
        message: `They are already on this team!`
    }

    if (existingInvite?.status === 'pending') throw {
        status: 400,
        message: `The invite is already pending.`
    }

    if (existingInvite?.status === 'rejected') throw {
        status: 400,
        message: `The user has made it clear that they don't want to be on this team.`
    }

    const invite = await Invite.create({
        inviter: body.inviter,
        invitee: invitee._id,
        team: body.teamId
    })

    return {
        status: 201,
        message: "Invite sent",
        data: invite.toJSON()
    }

}, {
    findUserData: true,
    mustBeVerified: true
})