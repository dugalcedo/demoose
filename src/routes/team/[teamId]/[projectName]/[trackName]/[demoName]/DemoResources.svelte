<script lang="ts">
    import type { Data, Demo, UserData } from "../../../../../../lib/types.js";
    const { data, user, demo }: { data: Data, user: UserData, demo: Demo } = $props()
    import Mp3Uploader from "./Mp3Uploader.svelte";
</script> 

<table class="demo-resources">
    <tbody>
        <tr>
            <th>mp3</th>
            <td>
                {#if demo.has_upload}
                {@const url = `/mp3s/${data.team?._id}/${data.project?.name}/${data.track?.name}/${demo.name}`}
                    {#if user.verified}
                        <audio controls>
                            <source src={url}>
                        </audio>
                    {:else}
                        <p>Verify your account if you want to play mp3s.</p>
                    {/if}
                {:else}
                    N/A
                {/if}
            </td>
            <td>
                <Mp3Uploader {data} {demo} {user} />
            </td>
        </tr>
        <tr>
            <th>Audio URL</th>
            <td>{demo.audio_url || "N/A"}</td>
            <td>
                <button>
                    {demo.audio_url ? 'Edit' : 'Add'}
                </button>
            </td>
        </tr>
        <tr>
            <th>Project Files URL</th>
            <td>{demo.project_url || "N/A"}</td>
            <td>
                <button>
                    {demo.project_url ? 'Edit' : 'Add'}
                </button>
            </td>
        </tr>
    </tbody>
</table>

<style>
    table {
        font-size: .8rem;

        & tr {
            & > * {
                &:nth-child(1) {
                    width: 150px;
                }
                &:nth-child(3) {
                    width: 250px;
                }
            }
        }
    }
</style>