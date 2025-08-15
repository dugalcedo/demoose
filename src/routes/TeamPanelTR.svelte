<script lang="ts">
    import type { Team, UserData } from "../lib/types.js";
    const { team, userData } : { team: Team, userData: UserData } = $props()

    let role = $derived.by(() => {
        if (team.owner == userData._id) return 'owner'
        if (team.mods.includes(userData._id)) return 'mod'
        return 'member'
    })

</script>

<tr>
    <td>{team.name}</td>
    <td>{role}</td>
    <td>
        <a href="/team/{team._id}">Manage</a>
    </td>
</tr>