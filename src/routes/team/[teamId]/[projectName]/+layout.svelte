<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Data } from "../../../../lib/types.js";
    const { data, children } : { data: Data, children: Snippet } = $props()
    import { openConfirmModal } from "../../../../lib/stores/modals.svelte.js";
    let deleteProjectError = $state("")

    const handleDeleteProject = async () => {
        deleteProjectError = ""

        if (!data.userData || !data.team || !data.project) {
            return
        }

        const url = "/api/project/delete"
        const options = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                userId: data.userData._id,
                teamId: data.team._id,
                projectName: data.project.name
            })
        }
        
        const res = await fetch(url, options)

        if (!res.ok) {
            deleteProjectError = (await res.json()).message
            return
        }

        window.location.href = `/team/${data.team._id}`
    }

    const handleDeleteProjectClick = () => {
        openConfirmModal({
            title: `DELETING PROJECT "${data.project?.name}"`,
            text: `You are deleting this project from the team "${data.team?.name}". All of the tracks, demos, and comments associated with the project will be deleted forever. Are you sure you want to do this? This cannot be undone.`,
            mustType: `I really want to delete ${data.team?.name}/${data.project?.name}!!!`, 
            onConfirm: handleDeleteProject
        })
    }
</script>

<div class="sublayout" class:fade={data.track}>
    {#if !data.userData}
        <p>You are not logged in.</p>
    {:else if !data.team}
        <p>Invalid teamId in the URL.</p>
    {:else if !data.project}
        <p>Invalid project name in the URL.</p>
    {:else}
        <div class="head">
            <h3>
                <img src="/icons/project.svg" alt="project">
                PROJECT: 
                <a href="/team/{data.team._id}/{data.project.name}">{data.project.name}</a>
            </h3>
            {#if data.isTeamOwner}
                <div class="del">
                    <button class="red" onclick={handleDeleteProjectClick}>
                        Delete project "{data.project.name}"
                    </button>
                    <span class="error">{deleteProjectError}</span>
                </div>
            {/if}
        </div>
        <div class="body">{@render children()}</div>
    {/if}
</div>