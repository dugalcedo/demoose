<script lang="ts">
    import { onMount } from "svelte";
    import type { Team, Invite } from "../../../lib/types.js";
    import { getErrorMessage } from "../../../lib/index.js";
    const { team }: { team: Team } = $props()

    let invites: Invite[] | null = $state(null)
    let invitesError = $state("")

    onMount(async () => {
        const res = await fetch(`/api/team/invites?teamId=${team._id}`)
        if (!res.ok) {
            invitesError = await getErrorMessage(res)
            return
        }
        const result = await res.json()
        invites = result.data.filter((inv: Invite) => inv.status === 'pending')
    })


</script>

<tr>
    <th colspan="100" style="background-color: rgba(255, 255, 255, 0.2);">
        {#if !invitesError && !invites}
            loading invites...
        {:else if invitesError || !invites || !invites?.length}
            No pending invites
        {:else if invites}
            Pending invites
        {/if}
    </th>
</tr>
{#if invites?.length}
    {#each invites as invite}
        <tr>
            <td>{invite.invitee.displayName}</td>
        </tr>
    {/each}
{/if}