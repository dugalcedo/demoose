<script lang="ts">
    import type { Data, Team, UserData } from "../../../lib/types.js";
    const { 
        data, 
        team, 
        role, 
        member
    }: { 
        data: Data, 
        team: Team, 
        member: UserData,
        role: 'member' | 'mod' | 'owner'
    } = $props()
</script>

<tr>
    <td>{member.displayName}</td>
    <td>{role}</td>
    {#if role === 'owner'}
        <td>
            {#if member._id !== data.userData?._id}
                <button class="red">
                    &times;
                </button>
            {/if}
        </td>
    {/if}
</tr>