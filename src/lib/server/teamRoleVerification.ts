import { Team } from "./models/models.js";
import type { _TeamInterface } from "./models/Team.js"
import type { _UserInterface } from "./models/User.js"

export type TeamRole = 'member' | 'mod' | 'owner';

export const verifyTeamRole = async (user: _UserInterface | undefined, teamId: string, role: TeamRole): Promise<_TeamInterface> => {
    if (!user) throw {
        status: 401,
        message: "You must be logged in"
    }

    const team = await Team.findById(teamId)

    if (!team) throw {
        status: 404,
        message: "Team not found"
    }

    const err = {
        status: 401,
        message: `Your role in this team must be: ${role}`
    }

    switch (role) {
        case "owner":
            if (!team.owner.equals(user._id)) throw err;
        case "mod":
            if (!team.mods.map(id => id.toString()).includes(user._id.toString())) throw err;
        case "member":
            if (!team.members.map(id => id.toString()).includes(user._id.toString())) throw err;
    }

    return team
}