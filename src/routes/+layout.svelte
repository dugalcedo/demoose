<script lang="ts">
    import "../css/_main_.css"
    import Header from "../components/Header.svelte";
    import NavigationIndicator from "../components/NavigationIndicator.svelte";
    import { onMount, type Snippet } from "svelte";
    import type { Data } from "../lib/types.js";
    const { children, data } : { children: Snippet, data: Data } = $props()

    onMount(() => {
        console.log("DATA LOADED:", data)
    })

    import Confirm from "../components/Confirm.svelte";
</script>

<svelte:head>
    <title>Demoose - Collaborate with other musicians</title>
</svelte:head>

<Header {data} />

<main class="responsive">{@render children()}</main>

<!-- modals -->
<Confirm />
<NavigationIndicator />