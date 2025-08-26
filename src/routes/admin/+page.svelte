<script lang="ts">
    import { getErrorMessage } from "../../lib/index.js";
    import { onMount } from "svelte";
    import type { Data, UserData } from "../../lib/types.js";
    import AdminUsersTable from "./AdminUsersTable.svelte";

    const { data }: { data: Data } = $props()
    const ADMIN_DATA_KEY = "dugdemo::admin"

    type AdminData = {
        users: UserData[]
    }

    let adminDataError = $state("")
    let adminData: AdminData | undefined = $state()

    async function loadAdminData() {
        const ss = sessionStorage.getItem(ADMIN_DATA_KEY)
        if (ss) {
            adminData = JSON.parse(ss)
            return
        }
        const res = await fetch(`/api/admin`)
        if (!res.ok) {
            adminDataError = await getErrorMessage(res)
            return
        }

        adminData = (await res.json()).data
        sessionStorage.setItem(ADMIN_DATA_KEY, JSON.stringify($state.snapshot(adminData)))
        console.log("Admin data:", $state.snapshot(adminData))
    }

    onMount(() => {
        if (data.userData?.tier !== 'admin') return
        loadAdminData()
    })

</script>

<div class="page">
    {#if data.userData?.tier !== 'admin'}
        <p>ERROR 404</p>
    {:else}
        {#if !adminData && adminDataError}
            <p>Error loading admin data: {adminDataError}</p>
        {:else if !adminData}
            <p>Loading...</p>
        {:else}
            <AdminUsersTable users={adminData.users} />
        {/if}
    {/if}
</div>