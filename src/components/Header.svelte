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
            {/if}
            {#if data.unverifiedUserData || data.userData}
            {@const notifCount = data.userData?.invites.length}
                <button onclick={logOut}>
                    Log out
                </button>
                <a href="/notifications" class="bell-btn">
                    <img src="/icons/bell.svg" alt="bell" style="width: 25px;">
                    {#if notifCount}
                        <div class="notif-count">{notifCount}</div>
                    {/if}
                </a>
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

    .bell-btn {
        border: 0;
        background-color: transparent;
        box-shadow: 0;
        position: relative;
    }

    .notif-count {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        background-color: magenta;
        color: white;
        width: 25px;
        height: 25px;
        font-size: .8rem;
        border-radius: 100%;
    }
</style>