<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import { type UserData } from "../lib/types.js";
    const { userData } : { userData: UserData } = $props()
    import TeamPanelTr from "./TeamPanelTR.svelte";

    let createTeamError = $state("")

    const createTeam: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const formData = {
            ...Object.fromEntries(new FormData(e.currentTarget)),
            userId: userData._id
        }

        const url = `/api/team/add`

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }

        const res = await fetch(url, options)

        if (!res.ok) { 
            const { message } = await res.json()
            createTeamError = message
            return
        }

        window.location.reload()
    }
</script>

<div class="team-panel">
    {#if userData.teams.length == 0}
        <p>You do not have any teams.</p>
    {:else}
        <h3>Your teams</h3>
        <table>
            <thead>
                <tr>
                    <th>Team name</th>
                    <th>Your role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each userData.teams as team, i (team._id)}
                    <TeamPanelTr {team} {userData} />
                {/each}
            </tbody>
        </table>
    {/if}

    <form class="create-team-form" onsubmit={createTeam}>
        <h3 class="title">New team</h3>
        <div class="field">
            <label for="create-team-form_name">Team name</label>
            <input type="text" required name="name">
        </div>
        <button type="submit">
            Create team
        </button>
        <span class="error">{createTeamError}</span>
    </form>
</div>