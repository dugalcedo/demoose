<script lang="ts">
    import type { Data } from "../../../../lib/types.js";
    const { data } : { data: Data } = $props()
</script>

{#if data.userData && data.team && data.project}
    {#if data.project.tracks.length == 0}
        <p>This project has no tracks.</p>
    {:else}
        <h3>{data.project.name}'s tracks</h3>
        <table></table>
    {/if}
{/if}