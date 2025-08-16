<script lang="ts">
    import type { Data } from "../../../../../lib/types.js";
    import type { Snippet } from "svelte";
    const { data, children } : { data: Data, children: Snippet } = $props()


</script>

<div class="sublayout">
    {#if !data.userData}
        <p>You are not logged in.</p>
    {:else if !data.team}
        <p>Invalid teamId in the URL.</p>
    {:else if !data.project}
        <p>Invalid project name in the URL.</p>
    {:else if !data.track}
        <p>Invalid track name in the URL.</p>
    {:else}
        <div class="head">
            <h3>TRACK: <a href="/team/{data.team._id}/{data.project.name}/{data.track.name}">{data.track.name}</a></h3>
            {#if data.isTeamOwner}
                <div class="del">
                    <button class="red">
                        Delete track "{data.track.name}"
                    </button>
                    <span class="error"></span>
                </div>
            {/if}
        </div>
        {@render children()}
    {/if}
</div>