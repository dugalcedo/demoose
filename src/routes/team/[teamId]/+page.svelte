<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import type { Data } from "../../../lib/types.js";
    import { getErrorMessage } from "../../../lib/index.js";
    const { data } : { data: Data } = $props()

    let createProjectError = $state("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
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

    <form class="add-project-form" onsubmit={handleSubmit}>
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
