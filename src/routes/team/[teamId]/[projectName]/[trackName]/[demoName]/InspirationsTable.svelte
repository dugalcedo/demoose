<script lang="ts">
    import type { Inspiration } from "../../../../../../lib/types.js";
    const { inspirations }: { inspirations: Inspiration[] } = $props()
</script>

<table>
    <caption>Inspirations</caption>
    <thead>
        <tr>
            <th>URL</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {#each inspirations as insp (insp)}
            <tr>
                <td>
                    {#if insp.url}
                        <a href={insp.url}>
                            {insp.url.slice(0, 30)}{#if insp.url.length > 30}...{/if}
                        </a>
                    {:else}
                        none
                    {/if}
                </td>
                <td>{insp.description}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        font-size: .7rem;
        margin-bottom: 4rem;
    }
</style>