<script lang="ts">
    import type { Data } from "../../lib/types.js";
    const { data }: { data: Data } = $props()
</script>


<div class="page">
    {#if !data.userData}
        <p>You must be logged in.</p>
    {:else}
        <div class="panels">

            <!-- Invites -->
            <div class="panel">
                <div class="head">
                    <h3>Your invites</h3>
                </div>
                <div class="body">
                    {#if !data.userData.invites.length}
                        <p>You have no invites</p>
                    {:else}
                        <p class="error">Ability to accept invites not yet implemented.</p>
                        <div class="invites">
                            {#each data.userData.invites as invite}
                                <div class="invite">
                                    <strong>{invite.inviter.displayName}</strong>
                                    has invited you to join the team
                                    <strong>"{invite.team.name}"</strong>
                                    <button>Accept</button>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>

        </div>
    {/if}
</div>

<style>
    .invites {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .invite {
        font-size: .9rem;
        background-color: rgba(255, 255, 255, 0.2);
        padding: .5rem;
    }
</style>