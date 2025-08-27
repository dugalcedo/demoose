<script lang="ts">
    import Toggle from "../../components/Toggle.svelte";
    import Form from "../../components/Form.svelte";
    import { resetPasswordStore } from "../../lib/stores/modals.svelte.js";

    let formType = $state<'Log in'|'Join'>('Log in');
    let formData = $state({
        email: "",
        password: "",
        password2: "",
        displayName: ""
    })

</script>

<Toggle 
    bind:value={formType}
    options={[
        {text: 'Log in'},
        {text: 'Join'}
    ]}
/>

<Form
    buttonText={formType}
    url={`/api/user/${formType == 'Join' ? 'join' : 'login'}`}
    method="POST"
    onSuccess="/"
    beforeSubmit={(e, fd, api) => {
        if (formType === 'Join' && (formData.password !== formData.password2)) {
            api.err("Passwords must match")
        }
        return fd
    }}
    body={formData}
>
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
</Form>

<button onclick={() => resetPasswordStore.state = { open: true }}>
    Reset forgotten password
</button>


