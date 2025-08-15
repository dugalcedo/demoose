<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Data } from "../../../lib/types.js";
    const { data, children }: { data: Data, children: Snippet } = $props()
    import { openConfirmModal } from "../../../lib/stores/modals.svelte.js";

    let deleteTeamError = $state("")

    const role = $derived.by(() => {
        if (!data.team || !data.userData) return 'member'
        if (data.team.owner === data.userData._id) return 'owner'
        if (data.team.mods.includes(data.userData._id)) return 'mod'
        return 'member'
    })

    const deleteTeam = async () => {
        if (!data.team || !data.userData) return;
        const url = `/api/team/delete`
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                teamId: data.team._id,
                userId: data.userData._id
            })
        }
        const res = await fetch(url, options)
        if (!res.ok) {
            const { message } = await res.json()
            deleteTeamError = message
            return
        }
        window.location.href = "/"
    }

    const handleDeleteTeamClick = () => {
        deleteTeamError = ""
        if (!data.team) return;
        openConfirmModal({
            title: `DELETING TEAM "${data.team.name}"`,
            text: `Are you sure you want to do this? All projects, tracks, and demos will be lost, and this cannot be undone.`,
            mustType: `I really want to delete ${data.team.name}!!!`,
            onConfirm() {
                deleteTeam()
            }
        })
    }

</script>

{#if !data.userData}
    <p>You must be logged in.</p>
{:else if !data.team}
    <p>Invalid teamId in URL.</p>
{:else}
    <h2>TEAM: {data.team.name}</h2>
    <p>Your role: <strong>{role}</strong></p>
    {#if role === 'owner'}
        <button class="red" onclick={handleDeleteTeamClick}>
            Delete team
        </button>
        <span class="error">{deleteTeamError}</span>
    {/if}
    {@render children()}
{/if}