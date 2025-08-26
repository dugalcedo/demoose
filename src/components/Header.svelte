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
        <div class="logo">
            <img src="/moose.png" alt="cartoon moose">
            <a href="/">
                <h1>demoose</h1>
            </a>
        </div>
        <nav>
            {#if data.userData}
                <a href="/">Your teams</a>
                {#if data.userData.tier == 'admin'}
                    <a href="/admin">Admin panel</a>
                {/if}
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
    .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        & img {
            width: 100px;
            margin: -15px;
        }
    }

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

    nav {
        display: flex;
        align-items: center;

        & a {
            padding: 1rem;
        }
    }
</style>