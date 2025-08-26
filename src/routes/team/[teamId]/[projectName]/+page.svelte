<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import type { Data } from "../../../../lib/types.js";
    import { getErrorMessage } from "../../../../lib/index.js";
    const { data } : { data: Data } = $props()

    let createTrackError = $state("")

    const handleCreateTrack: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        createTrackError = ""

        if (!data.team || !data.userData || !data.project) {
            createTrackError = "MISSING CONTEXT"
            return
        }

        const url = "/api/track/add"
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ...Object.fromEntries(new FormData(e.currentTarget)),
                userId: data.userData._id,
                teamId: data.team._id,
                projectName: data.project.name
            })
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            createTrackError = await getErrorMessage(res)
            return
        }

        window.location.reload()
    }
</script>

<div class="panels">
    {#if data.userData && data.team && data.project}
        {#if data.project.tracks.length == 0}
            <p>This project has no tracks.</p>
        {:else}
            <div class="panel">
                <div class="head">
                    <h3>{data.project.name}'s tracks</h3>
                </div>
                <div class="body">
                    <table>
                        <thead>
                            <tr>
                                <th>Track name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each data.project.tracks as track}
                                <tr>
                                    <td>{track.name}</td>
                                    <td>
                                        <a href="/team/{data.team._id}/{data.project.name}/{track.name}">Manage</a>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}

        <div class="panel">
            <div class="head">
                <h4>Create new track</h4>
            </div>
            <div class="body">
                <form class="add-track-form" onsubmit={handleCreateTrack}>
                    <div class="field">
                        <label for="add-track-form_name">Track name</label>
                        <input type="text" id="add-track-form_name" name="name" required>
                    </div>
                    <div class="foot">
                        <button type="submit">
                            Create new track in "{data.team.name}/{data.project.name}"
                        </button>
                        <span class="error">
                            {createTrackError}
                        </span>
                    </div>
                </form>
            </div>
        </div>

    {/if}
</div>