<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import Toggle from "../../components/Toggle.svelte";

    let formType = $state<'Log in'|'Join'>('Log in');
    let formData = $state({
        email: "",
        password: "",
        password2: "",
        displayName: ""
    })
    let formError = $state("")

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        formError = ""

        const url = `/api/user/${formType == 'Join' ? 'join' : 'login'}`;

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            const { message } = await res.json()
            formError = message
            return
        }

        window.location.href = "/"
    }

</script>

<Toggle 
    bind:value={formType}
    options={[
        {text: 'Log in'},
        {text: 'Join'}
    ]}
/>

<form onsubmit={handleSubmit}>
    <div class="field">
        Email
        <input type="email" required bind:value={formData.email}>
    </div>
    {#if formType === 'Join'}
        <div class="field">
            Display name
            <input type="text" required bind:value={formData.displayName}>
        </div>
    {/if}
    <div class="field">
        Password
        <input type="password" required bind:value={formData.password}>
    </div>
    {#if formType === 'Join'}
        <div class="field">
            Repeat password
            <input type="password" required bind:value={formData.password2}>
        </div>
    {/if}
    <button type="submit">
        {formType}
    </button>
    {#if formError}
        <span class="error">{formError}</span>
    {/if}
</form>