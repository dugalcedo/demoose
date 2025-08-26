<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import type { Data } from "../../../lib/types.js";
    import { getErrorMessage } from "../../../lib/index.js";
    import TeamMembersRow from "./TeamMembersRow.svelte";
    const { 
        data 
    } : { 
        data: Data 
    } = $props()

    const role = $derived.by(() => {
        if (data.team?.owner === data.userData?._id) return 'owner'
        if (data.team?.mods.map(m => m._id).includes(data.userData?._id||'')) return 'mod'
        return 'member'
    })

    let createProjectError = $state("")

    const handleCreateProject: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        createProjectError = ""

        if (!data.userData) return;
        if (!data.team) return;

        const url = "/api/project/add"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...Object.fromEntries(new FormData(e.currentTarget)),
                teamId: data.team._id,
                userId: data.userData._id
            })
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            createProjectError = await getErrorMessage(res)
            return
        }

        window.location.reload()
    }

    
</script>

{#if data.userData && data.team}
    {#if data.team.projects.length == 0}
        <p>This team has no projects.</p>
    {:else}
        <h3>Projects</h3>
        <table>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each data.team.projects as project}
                    <tr>
                        <td>{project.name}</td>
                        <td>
                            <a href="/team/{data.team._id}/{project.name}">Manage</a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    <h3>Mebers</h3>
    <table>
        <thead>
            <tr>
                <th>Display name</th>
                <th>Role</th>
                {#if role === 'owner'}
                    <th></th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each data.team.members as member}
                <TeamMembersRow {member} {role} data={data} team={data.team} />
            {/each}
            {#if ['owner', 'mod'].includes(role)}
                <tr>
                    <td colspan="100">
                        <input type="text" aria-label="Invite user" name="username" placeholder="Enter username">
                        <button>Invite user</button>
                        <br>
                        <span class="error"></span>
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>

    <form class="add-project-form" onsubmit={handleCreateProject}>
        <h4>Create new project</h4>
        <div class="field">
            <label for="add-project-form_name">Project name</label>
            <input type="text" name="name" required>
        </div>
        <button type="submit">
            Create project in team "{data.team.name}"
        </button>
        <span class="error">{createProjectError}</span>
    </form>
{/if}
