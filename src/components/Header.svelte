<script lang="ts">
    import { type Data } from "../lib/types.js";
    const { data } : { data: Data } = $props()

    function logOut() {
        console.log('logging out')
        document.cookie = "dugdemotoken=; Max-Age=0; path=/;";
        window.location.reload()
    }

</script>

<header>
    <h1>demoose</h1>
    <nav>
        {#if data.userData}
            <button onclick={logOut}>
                Log out
            </button>
        {:else}
            <a href="/auth">Log in / join</a>
        {/if}
    </nav>
</header>