<script lang="ts">
    import { beforeNavigate, afterNavigate } from "$app/navigation";
    let navigating = $state(false)

    beforeNavigate(() => {
        navigating = true
    })

    afterNavigate(() => {
        navigating = false
    })
</script>

<div class="navigation-indicator" class:shown={navigating}>
    <p>Loading...</p>
</div>

<style>
    .navigation-indicator {
        position: fixed;
        z-index: 10000;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        display: none;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(5px);

        &.shown {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>