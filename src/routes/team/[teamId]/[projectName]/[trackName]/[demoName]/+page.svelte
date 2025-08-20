<script lang="ts">
    import type { Data } from "../../../../../../lib/types.js";
    const { data } : { data: Data } = $props()
    import AddCommentForm from "./AddCommentForm.svelte";
    import AddInspirationForm from "./AddInspirationForm.svelte";
</script>

{#if data.userData && data.team && data.project && data.track && data.demo}
{@const demo = data.demo}
    <div class="demo-panel">

        <!-- Links -->
        <table>
            <tbody>
                <tr>
                    <th>Audio URL</th>
                    <td>{demo.audio_url || "N/A"}</td>
                    <td>
                        <button>
                            {demo.audio_url ? 'Edit' : 'Add'}
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Project Files URL</th>
                    <td>{demo.project_url || "N/A"}</td>
                    <td>
                        <button>
                            {demo.project_url ? 'Edit' : 'Add'}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Inspirations & comments -->
        <section class="insp-comm">
            <div class="insp">
                <h4>Inspirations</h4>
                {#if !demo.inspirations?.length}
                    This demo has no inspirations.
                {/if}
                <AddInspirationForm {data} />
            </div>
            <div class="comm">
                <h4>Comments</h4>
                {#if !demo.comments.length}
                    This demo has no comments.
                {/if}
                <AddCommentForm {data} />
            </div>
        </section>

    </div>
{/if}

<style>
    .insp-comm {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .insp, .comm {
        padding: 1rem;
    }
</style>