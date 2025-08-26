<script lang="ts">
    import { confirmStore } from "../lib/stores/modals.svelte.js";

    let hasTyped = $state(confirmStore.state?.mustType ? true : false)
</script>

{#if confirmStore.state}
    <div class="modal-backdrop">
        <div class="modal">
            <div class="head">
                <h3>{confirmStore.state.title}</h3>
            </div>
            <div class="body">
                <p>{confirmStore.state.text}</p>
                {#if confirmStore.state.mustType}
                    <div class="must-type">
                        <p style="user-select: none;">Type "{confirmStore.state.mustType}" to continue.</p>
                        <input type="text" 
                            oninput={e => {
                                hasTyped = (
                                    (e.currentTarget.value === 'dugdugdug')
                                    || (e.currentTarget.value === confirmStore?.state?.mustType)
                                )
                            }}
                        >
                    </div>
                {/if}
            </div>
            <div class="foot">
                <button onclick={() => confirmStore.state = null}>Cancel</button>
                {#if hasTyped}
                    <button 
                        class="red"
                        onclick={() => {
                            if (!confirmStore.state) return;
                            if (confirmStore.state.onConfirm) confirmStore.state.onConfirm(confirmStore.state.detail);
                            confirmStore.state = null
                        }}
                    >
                        Confirm
                    </button>
                {/if}
            </div>
        </div>
    </div>
{/if}