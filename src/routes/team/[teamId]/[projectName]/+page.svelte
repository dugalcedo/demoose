<script lang="ts">
    import type { Data } from "../../../../lib/types.js";
    import Form from "../../../../components/Form.svelte";
    const { data } : { data: Data } = $props()


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
                <Form
                    buttonText="Create track"
                    url="/api/track/add"
                    method="POST"
                    body={{
                        userId: data.userData._id,
                        teamId: data.team._id,
                        projectName: data.project.name
                    }}
                >
                    <div class="field">
                        <label for="add-track-form_name">Track name</label>
                        <input type="text" id="add-track-form_name" name="name" required>
                    </div>
                </Form>
            </div>
        </div>

    {/if}
</div>