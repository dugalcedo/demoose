<script lang="ts">
    import type { UserData } from "../../lib/types.js";
    const { user }: { user: UserData } = $props()

    const tiers = ['deer', 'wapiti', 'moose', 'admin'] as const;

</script>

<tr>
    <td>{user.displayName}</td>
    <td>{user.email}</td>
    <td>
        <select value={user.tier}>
            {#each tiers as tier}
                <option value={tier}>{tier}</option>
            {/each}
        </select>
    </td>
</tr>