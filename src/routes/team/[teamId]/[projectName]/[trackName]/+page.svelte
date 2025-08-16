<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import type { Data } from "../../../../../lib/types.js";
    const { data } : { data: Data } = $props()

    let createDemoError = $state("")

    const handleCreateDemo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        createDemoError = ""

        if (!data.userData || !data.team || !data.project || !data.track) {
            createDemoError = "MISSING CONTEXT"
            return
        }

        const url = "/api/demo/add"
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ...Object.fromEntries(new FormData(e.currentTarget)),
                userId: data.userData._id,
                teamId: data.team._id,
                projectName: data.project.name,
                trackName: data.track.name
            })
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            const data = await res.json()
            createDemoError = data.message
            return
        }

        window.location.reload()
    }
</script>

{#if data.userData && data.team && data.project && data.track}
    {#if data.track.demos.length === 0}
        <p>This track has no demos.</p>
    {:else}
        <h3>{data.track.name}'s demos</h3>
        <table>
            <thead>
                <tr>
                    <th>Demo name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each data.track.demos as demo}
                    <tr>
                        <th>{demo.name}</th>
                        <th>
                            <a href="/team/{data.team._id}/{data.project.name}/{data.track.name}/{demo.name}">Manage demo</a>
                        </th>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
    <form class="create-demo-form" onsubmit={handleCreateDemo}>
        <h4>Create new demo</h4>
        <div class="field">
            <label for="create-demo-form_name">Demo name</label>
            <input type="text" id="create-demo-form_name" name="name" required>
        </div>
        <button type="submit">
            Create new demo in "{data.team.name}/{data.project.name}/{data.track.name}"
        </button>
        <span class="error">{createDemoError}</span>
    </form>
{/if}