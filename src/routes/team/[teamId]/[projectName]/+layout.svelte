<script lang="ts">
    import type { Snippet } from "svelte";
    import type { Data } from "../../../../lib/types.js";
    const { data, children } : { data: Data, children: Snippet } = $props()
</script>

{#if !data.userData}
    <p>You are not logged in.</p>
{:else if !data.team}
    <p>Invalid teamId in the URL.</p>
{:else if !data.project}
    <p>Invalid project name in the URL.</p>
{:else}
    <h3>PROJECT: {data.project.name}</h3>
    {@render children()}
{/if}