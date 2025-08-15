<script lang="ts">
    import { type Data } from "../lib/types.js";
    const { data } : { data: Data } = $props()
    import TeamPanel from "./TeamPanel.svelte";
</script>

<div class="auth-status">
    <p>
        {#if data.userData}
            You are logged in as <strong>{data.userData.displayName}</strong>.
        {:else}
            You are not logged in.
        {/if}
    </p>
</div>

{#if data.userData}
    <TeamPanel userData={data.userData} />
{/if}