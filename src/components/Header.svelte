<script lang="ts">
    import { type Data } from "../lib/types.js";
    const { data } : { data: Data } = $props()

    function logOut() {
        console.log('logging out')
        document.cookie = "dugdemotoken=; Max-Age=0; path=/;";
        window.location.reload()
    }

</script>

<div class="header-wrapper">
    <header class="responsive">
        <div>
            <h1>demoose</h1>
        </div>
        <nav>
            {#if data.userData}
                <a href="/">Your teams</a>
                <button onclick={logOut}>
                    Log out
                </button>
            {:else if data.unverifiedUserData}
                <button onclick={logOut}>
                    Log out
                </button>
            {:else}
                <a href="/auth">Log in / join</a>
            {/if}
        </nav>
    </header>
</div>

<style>
    .header-wrapper {
        background-color: black;
        padding: 1rem 0;
        margin-bottom: 1rem;
    }

    header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }
</style>