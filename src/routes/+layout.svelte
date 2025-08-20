<script lang="ts">
    import "../css/_main_.css"
    import Header from "../components/Header.svelte";
    import type { Snippet } from "svelte";
    import type { Data } from "../lib/types.js";
    const { children, data } : { children: Snippet, data: Data } = $props()

    import Confirm from "../components/Confirm.svelte";
</script>


<Header {data} />

<main class="responsive">{@render children()}</main>

<!-- modals -->
<Confirm />