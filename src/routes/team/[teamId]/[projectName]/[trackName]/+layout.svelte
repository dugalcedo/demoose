<script lang="ts">
    import { getErrorMessage } from "../../../../../lib/index.js";
    import { openConfirmModal } from "../../../../../lib/stores/modals.svelte.js";
    import type { Data } from "../../../../../lib/types.js";
    import type { Snippet } from "svelte";
    const { data, children } : { data: Data, children: Snippet } = $props()

    let deleteTrackError = $state("")

    const deleteTrack = async () => {
        if (!data.userData || !data.team || !data.project || !data.track) {
            deleteTrackError = "MISSING CONTEXT"
            return
        }

        const url = `/api/track/delete`
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: data.userData._id,
                teamId: data.team._id,
                projectName: data.project.name,
                trackName: data.track.name
            })
        }
        const res = await fetch(url, options)

        if (!res.ok) {
            deleteTrackError = await getErrorMessage(res)
            return
        }

        window.location.href = `/team/${data.team._id}/${data.project.name}`
    }

    const handleDeleteTrackClick = () => {
        openConfirmModal({
            title: `Are you sure you want to delete "${data.track?.name}"?`,
            text: `It along with all of its demos will be gone forever.`,
            mustType: `I really want to delete ${data.project?.name}/${data.track?.name}!!!`,
            onConfirm: deleteTrack
        })
    }

</script>

<div class="sublayout">
    {#if !data.userData}
        <p>You are not logged in.</p>
    {:else if !data.team}
        <p>Invalid teamId in the URL.</p>
    {:else if !data.project}
        <p>Invalid project name in the URL.</p>
    {:else if !data.track}
        <p>Invalid track name in the URL.</p>
    {:else}
        <div class="head">
            <h3>
                <img src="/icons/track.svg" alt="track">
                TRACK: 
                <a href="/team/{data.team._id}/{data.project.name}/{data.track.name}">{data.track.name}</a>
            </h3>
            {#if data.isTeamOwner}
                <div class="del">
                    <button class="red" onclick={handleDeleteTrackClick}>
                        Delete track "{data.track.name}"
                    </button>
                    <span class="error"></span>
                </div>
            {/if}
        </div>
        <div class="body">{@render children()}</div>
    {/if}
</div>