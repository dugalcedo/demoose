<script lang="ts">
    import type { UserData } from "../../lib/types.js";
    import AdminUsersTableRow from "./AdminUsersTable_Row.svelte";
    const { users } : { users: UserData[] } = $props()
</script>

<div class="panel">
    <h3>USERS</h3>
    <table>
        <tbody>
            {#each users as user}
                <AdminUsersTableRow {user} />
            {/each}
        </tbody>
    </table>
</div>