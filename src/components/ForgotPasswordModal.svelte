<script lang="ts">
    import { resetPasswordStore } from "../lib/stores/modals.svelte.js";
    import Form from "./Form.svelte";

    let success = $state(false)

    const handleSuccess = () => {
        success = true
    }

</script>

{#if resetPasswordStore.state?.open}
    <div class="modal-backdrop">
        <div class="modal">
            <div class="head">
                <h2>Forgot your password?</h2>
            </div>
            <div class="body">
                {#if !success}
                    <Form
                        buttonText="Send email"
                        url="/api/user/sendResetEmail"
                        method="POST"
                        onSuccess={handleSuccess}
                    >
                        <div class="field">
                            <label for="reset-pwd_email">Email</label>
                            <input type="email" id="reset-pwd_email" name="email" required>
                        </div>
                    </Form>
                {:else}
                    <p>
                        Expect an email.
                    </p>
                {/if}
            </div>
            <div class="foot">
                <button onclick={() => resetPasswordStore.state = null}>
                    Close
                </button>
            </div>
        </div>
    </div>
{/if}