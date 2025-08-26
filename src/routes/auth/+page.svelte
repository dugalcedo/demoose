<script lang="ts">
    import Toggle from "../../components/Toggle.svelte";
    import Form from "../../components/Form.svelte";

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
