<script lang="ts">
    import { onMount } from "svelte";
    import { type Data } from "../../../lib/types.js";
    import { goto } from "$app/navigation";
    import { getErrorMessage } from "../../../lib/index.js";
    const { data } : { data: Data } = $props()

    let verifyError = $state("")

    const verify = async () => {
        if (!data.params.verificationToken) {
            verifyError = "Invalid verification token."
            return
        }
        
        const url = `/api/verify/${data.params.verificationToken}`
        const res = await fetch(url)

        if (!res.ok) {
            verifyError = await getErrorMessage(res)
            return
        }

        window.location.href = "/"
    }

    onMount(() => {
        if (!data.userData && !data.unverifiedUserData) {
            setTimeout(() => goto("/auth"), 2000)
        } else if (data.userData) {
            setTimeout(() => goto("/"), 2000)
        } else {
            verify()
        }
    })

</script>

{#if data.userData}
    <p>You are already verified. Redirecting...</p>
{:else if data.unverifiedUserData}
    {#if verifyError}
        <span class="error">{verifyError}</span>
    {:else}
        <p>Verifying your account. Please wait.</p>
    {/if}
{:else}
    <p>You are not logged in. Redirecting you to the log in page...</p>
{/if}