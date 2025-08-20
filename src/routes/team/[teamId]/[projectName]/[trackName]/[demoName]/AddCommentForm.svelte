<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import { getErrorMessage } from "../../../../../../lib/index.js";
    import type { Data } from "../../../../../../lib/types.js";
    const { data } : { data: Data } = $props()

    let addCommentError = $state("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        addCommentError = ""

        if (!data.userData || !data.team || !data.project || !data.track || !data.demo) {
            addCommentError = "MISSING CONTEXT"
            return
        }

        const formData = Object.fromEntries(new FormData(e.currentTarget))
        formData.timestamp = ((Number(formData.m)*60*1000)+(Number(formData.s)*1000)).toString()
        const url = `/api/comment/add`
        const options = {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                ...formData,
                userId: data.userData._id,
                teamId: data.team._id,
                projectName: data.project.name,
                trackName: data.track.name,
                demoName: data.demo.name
            })
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            addCommentError = await getErrorMessage(res)
            return
        }

        window.location.reload()
    }

</script>

{#if data.userData && data.team && data.project && data.track && data.demo}
    <form onsubmit={handleSubmit}>
        <h4>Add comment to "{data.demo.name}"</h4>
        <div class="field">
            <label for="add-insp-form_body">Comment</label>
            <textarea name="body" id="add-insp-form_body" style="resize: none;"></textarea>
        </div>
        <div class="field">
            <span>Timestamp (optional)</span>
            <div class="timestamp-inputs">
                <input type="number" name="m" value="0">
                <input type="number" name="s" value="0">
                <span>min.</span>
                <span>sec.</span>
            </div>
        </div>
        <button type="submit">
            Add comment
        </button>
        <span class="error">{addCommentError}</span>
    </form>
{:else}
    <p>MISSING CONTEXT</p>
{/if}

<style>
    .timestamp-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;

        & input {
            width: 60px;
            margin: auto;
        }

        & span {
            text-align: center;
        }
    }
</style>