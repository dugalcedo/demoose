<script lang="ts">
    import type { Data } from "../../../../../../lib/types.js";
    const { data } : { data: Data } = $props()
    import AddCommentForm from "./AddCommentForm.svelte";
    import AddInspirationForm from "./AddInspirationForm.svelte";
    import CommentTable from "./CommentTable.svelte";
    import DemoResources from "./DemoResources.svelte";
    import InspirationsTable from "./InspirationsTable.svelte";
</script>

{#if data.userData && data.team && data.project && data.track && data.demo}
{@const demo = data.demo}
    <div class="demo-panel">

        <div class="panels">
            <div class="panel" style="grid-column: span 3;">
                <!-- Links -->
                <div class="head">
                    <h4>Demo resources</h4>
                </div>
                <div class="body">
                    <DemoResources user={data.userData} {data} {demo} />
                </div>
            </div>
        </div>

        <!-- Inspirations & comments -->
        <section class="insp-comm">
            <div class="insp">
                {#if !demo.inspirations?.length}
                    This demo has no inspirations.
                {:else}
                    <InspirationsTable inspirations={demo.inspirations} />
                {/if}
                <AddInspirationForm {data} />
            </div>
            <div class="comm">
                {#if !demo.comments.length}
                    This demo has no comments.
                {:else}
                    <CommentTable comments={demo.comments} />
                {/if}
                <AddCommentForm {data} />
            </div>
        </section>

    </div>
{/if}

<style>
    .insp-comm {
        display: grid;
        margin-top: 2rem;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
    }

    .insp, .comm {
        padding: 1rem;
    }

    :global(.insp-comm caption) {
        background-color: rgba(0, 0, 0, 0.2);
        padding: .25rem;
        font-size: .9rem;
    }
</style>