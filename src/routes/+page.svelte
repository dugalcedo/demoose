<script lang="ts">
    import { type Data } from "../lib/types.js";
    const { data } : { data: Data } = $props()
    import TeamPanel from "./TeamPanel.svelte";
    import Unverified from "./Unverified.svelte";
</script>

<div class="auth-status">
    {#if data.unverifiedUserData}
        <div class="unverified">
            You are logged in as <strong>{data.unverifiedUserData.displayName}</strong>, but your account is <strong><u>unverified</u></strong>.
        </div>
    {:else if data.userData}
        <div class="verified">
            You are logged in. Welcome back, <strong>{data.userData.displayName}</strong>.
        </div>
    {:else}
        You are not logged in.
    {/if}
</div>

{#if data.unverifiedUserData}
    <Unverified data={{...data, unverifiedUserData: data.unverifiedUserData}} />
{:else if data.userData}
    <TeamPanel userData={data.userData} />
{/if}