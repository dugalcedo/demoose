<script lang="ts">
    import { type Data } from "../../../../../../lib/types.js";
    import { type Snippet } from "svelte";
    const { data, children } : { data: Data, children: Snippet } = $props()
    import { openConfirmModal } from "../../../../../../lib/stores/modals.svelte.js";
    import { getErrorMessage } from "../../../../../../lib/index.js";

    let deleteDemoError = $state("")

    const deleteDemo = async () => {
        if (!data.userData || !data.team || !data.project || !data.track || !data.demo) {
            deleteDemoError = "MISSING CONTEXT"
            return
        };

        const url = `/api/demo/delete`
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: data.userData._id,
                teamId: data.team._id,
                projectName: data.project.name,
                trackName: data.track.name,
                demoName: data.demo.name
            })
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            deleteDemoError = await getErrorMessage(res)
            return
        }

        window.location.href = `/team/${data.team._id}/${data.project.name}/${data.track.name}`
    }

    const handleDeleteDemoClick = async () => {
        openConfirmModal({
            title: `Deleting demo "${data.demo?.name}"`,
            text: `Are you sure you want to delete this demo? It along with all of its comments and inspirations will be gone forever.`,
            mustType: `I really want to delete ${data.track?.name}/${data.demo?.name}!!!`,
            onConfirm: deleteDemo
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
    {:else if !data.demo}
        <p>Invalid demo name in the URL.</p>
    {:else}
        <div class="head">
            <h4>
                <img src="/icons/demo.svg" alt="demo">
                DEMO: 
                <a href="/team/{data.team._id}/{data.project.name}/{data.track.name}/{data.demo.name}">{data.demo.name}</a>
            </h4>
            {#if data.isTeamOwner}
                <div class="del">
                    <button class="red" onclick={handleDeleteDemoClick}>
                        Delete demo "{data.demo.name}"
                    </button>
                    <span class="error"></span>
                </div>
            {/if}
        </div>
        <div class="body">{@render children()}</div>
    {/if}
</div>