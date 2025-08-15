<script lang="ts">
    import type { Data } from "../../../lib/types.js";
    const { data } : { data: Data } = $props()
</script>

{#if data.userData && data.team}
    {#if data.team.projects.length == 0}
        <p>This team has no projects.</p>
    {:else}
        <table>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each data.team.projects as project}
                    <tr>
                        <td>{project.name}</td>
                        <td>
                            <a href="/team/{data.team._id}/{project.name}">Manage</a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
{/if}