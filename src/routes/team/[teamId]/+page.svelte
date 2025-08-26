<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import type { Data } from "../../../lib/types.js";
    import { getErrorMessage } from "../../../lib/index.js";
    import TeamMembersRow from "./TeamMembersRow.svelte";
    import InviteMemberForm from "./InviteMemberForm.svelte";
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
    <div class="panels">
        {#if data.team.projects.length == 0}
            <p>This team has no projects.</p>
        {:else}
            <div class="panel">
                <div class="head">
                    <h3>Projects</h3>
                </div>
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
            </div>
        {/if}
        <div class="panel">
            <div class="head">
                <h3>Members</h3>
            </div>
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
                        <InviteMemberForm {data} team={data.team} />
                    {/if}
                </tbody>
            </table>
        </div>

        <div class="panel">
            <div class="head">
                <h4>Create new project</h4>
            </div>
            <div class="body">
                <form class="add-project-form" onsubmit={handleCreateProject}>
                    <div class="field">
                        <label for="add-project-form_name">Project name</label>
                        <input type="text" name="name" required>
                    </div>
                    <button type="submit">
                        Create project in team "{data.team.name}"
                    </button>
                    <span class="error">{createProjectError}</span>
                </form>
            </div>
        </div>
    </div>
{/if}
