<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    import { onMount, onDestroy } from "svelte";
    import { type Data, type UnverifiedUserData } from "../lib/types.js";
    import { getErrorMessage } from "../lib/index.js";
    const { data } : { data: Data & { unverifiedUserData: UnverifiedUserData } } = $props()
    const pad0 = (n: number) => ((n < 10) ? "0" : "") + Math.round(n);

    let sendEmailError = $state("")

    ////// TIMER
    let msSinceLastEmail = $state(data.unverifiedUserData.msSinceLastEmail)
    const fifteenSeconds = 1000*60*15;
    let canSend = $derived(msSinceLastEmail > fifteenSeconds)
    let interval = $state<any>()
    const { minLeft, secLeft } = $derived.by(() => {
        if (canSend) return { minLeft: 0, secLeft: 0 };
        const diff = fifteenSeconds - msSinceLastEmail;
        const minLeft = Math.floor(diff/1000/60);
        const secLeft = (diff/1000) - (minLeft*60);
        return { minLeft, secLeft }
    })
    onMount(() => {
        interval = setInterval(() => {
            if (canSend) {
                clearInterval(interval)
                return
            }
            msSinceLastEmail += 1000
        }, 1000)
    })
    onDestroy(() => clearInterval(interval))
    ////// END TIMER

    const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.currentTarget.disabled = true

        const res = await fetch("/api/sendValidationEmail")

        if (!res.ok) {
            sendEmailError = await getErrorMessage(res)
            return
        }

        window.location.reload()
    }

</script>

<div class="unverified-panel">

    <!-- Button and error -->
    <div>
        <button disabled={!canSend} onclick={handleClick}>
            Send validation email
        </button>
        <span class="error">{sendEmailError}</span>
    </div>

    {#if !canSend}
        <div>
            <p>You must wait before you can send another validation email.</p>
            <p>Time remaining: {pad0(minLeft)}:{pad0(secLeft)}</p>
        </div>
    {/if}
    
</div>

