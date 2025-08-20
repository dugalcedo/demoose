<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import type { Data } from "../../../../../../lib/types.js";
    import { getErrorMessage } from "../../../../../../lib/index.js";
    const { data } : { data: Data } = $props()

    let addInspirationError = $state("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        addInspirationError = ""

        if (!data.userData || !data.team || !data.project || !data.track || !data.demo) {
            addInspirationError = "MISSING CONTEXT"
            return
        }

        const formData = Object.fromEntries(new FormData(e.currentTarget))
        const url = `/api/inspiration/add`
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
            addInspirationError = await getErrorMessage(res)
            return
        }

        window.location.reload()
    }

</script>

{#if data.userData && data.team && data.project && data.track && data.demo}
    <form onsubmit={handleSubmit}>
        <h4>Add inspiration to "{data.demo.name}"</h4>
        <div class="field">
            <label for="add-insp-form_description">Description</label>
            <input type="text" name="description" id="add-insp-form_description">
        </div>
        <div class="field">
            <label for="add-insp-form_url">URL (optional)</label>
            <input type="text" id="add-insp-form_url" name="url">
        </div>
        <button type="submit">
            Add inspiration
        </button>
        <span class="error">
            {addInspirationError}
        </span>
    </form>
{:else}
    <p>MISSING CONTEXT</p>
{/if}