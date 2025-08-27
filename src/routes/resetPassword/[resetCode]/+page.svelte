<script lang="ts">
    import type { Data } from "../../../lib/types.js";
    const { data }: { data: Data } = $props()
    import Form from "../../../components/Form.svelte";
    import { goto } from "$app/navigation";

    let success = $state(false)

    const handleSuccess = () => {
        success = true
        setTimeout(() => {
            goto('/auth')
        }, 3000);
    }

</script>

<div class="page">
    {#if !data.params.resetCode}
        <p>Invalid reset code</p>
    {:else if !success}
        <Form
            buttonText="reset"
            url="/api/user/resetPassword"
            method="PUT"
            beforeSubmit={(_e, fd, { err }) => {
                if (fd.password != fd.password2) err("Passwords must match")
                return fd
            }}
            body={{ code: data.params.resetCode }}
            onSuccess={handleSuccess}
        >
            <div class="field">
                <label for="reset-pwd_pwd">New password</label>
                <input type="password" id="reset-pwd_pwd" name="password" required>
            </div>
            <div class="field">
                <label for="reset-pwd_pwd2">Repeat new password</label>
                <input type="password" id="reset-pwd_pwd2" name="password2" required>
            </div>
        </Form>
    {:else}
        <p>Your password has been reset. Redirecting you to log in page...</p>
    {/if}
</div>