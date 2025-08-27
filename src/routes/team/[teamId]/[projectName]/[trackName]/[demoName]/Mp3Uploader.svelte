<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import type { Data, Demo, UserData } from "../../../../../../lib/types.js";
    import { getErrorMessage } from "../../../../../../lib/index.js";

    const {
        data,
        demo,
        user
    }: {
        data: Data
        demo: Demo
        user: UserData
    } = $props()

    let uploadError = $state("")
    let loading = $state(false)

    const handleUpload: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        loading = true
        uploadError = ""

        if (!data.userData || !data.team || !data.project || !data.track) {
            uploadError = "MISSING CONTEXT"
            loading = false
            return
        }

        const formData = new FormData(e.currentTarget)
        formData.append('userId', data.userData._id)
        formData.append('teamId', data.team._id)
        formData.append('projectName', data.project.name)
        formData.append('trackName', data.track.name)
        formData.append('demoName', demo.name)

        const url = demo.has_upload ? "/api/demo/upload" : "/api/demo/upload"
        const options = {
            method: "POST",
            body: formData
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            uploadError = await getErrorMessage(res)
            loading = false
            return
        }

        window.location.reload()
    }

</script>

{#if user.tier === 'deer'}
    <p>Upgrade to upload mp3s directly to Demoose!</p>
{:else}
    <form onsubmit={handleUpload}>
        <div class="body">
            <div class="field">
                <label for="upload-mp3_file">File</label>
                <input id="upload-mp3_title" name="file" type="file" accept="audio/mpeg" required>
            </div>
        </div>
        <div class="foot">
            <button disabled={loading}>
                {demo.has_upload ? "Replace" : "Upload"}
            </button>
            <span class="error">{uploadError}</span>
            <p class="error">
                NOTE: Dug is currently hosting this app on Vercel's free tier, which means uploads greater than 4.5MB are not currently possible. If you want this feature, <a href="/contact">contact Dug</a> and let him know.
            </p>
        </div>
    </form>
{/if}

<style>
    .error {
        margin-top: 1rem;
        background-color: maroon;
        color: white;
    }
    form {
        margin: 0;
        padding: 0;
        border: 0;
    }
</style>