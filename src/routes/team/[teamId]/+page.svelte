<script lang="ts">
    import type { Data } from "../../../lib/types.js";
    import TeamMembersRow from "./TeamMembersRow.svelte";
    import InviteMemberForm from "./InviteMemberForm.svelte";
    import Form from "../../../components/Form.svelte";

    const { 
        data 
    } : { 
        data: Data 
    } = $props()

    const role = $derived.by(() => {
        if (data.team?.owner === data.userData?._id) return 'owner'
        if (data.team?.mods.map(m => m._id).includes(data.userData?._id||'')) return 'mod'
        return 'member'
    })

    
</script>

{#if data.userData && data.team}
    <div class="panels">
        {#if data.team.projects.length == 0}
            <p>This team has no projects.</p>
        {:else}
            <div class="panel">
                <div class="head">
                    <h3>Projects</h3>
                </div>
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
            </div>
        {/if}
        <div class="panel">
            <div class="head">
                <h3>Members</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Display name</th>
                        <th>Role</th>
                        {#if role === 'owner'}
                            <th></th>
                        {/if}
                    </tr>
                </thead>
                <tbody>
                    {#each data.team.members as member}
                        <TeamMembersRow {member} {role} data={data} team={data.team} />
                    {/each}
                    {#if ['owner', 'mod'].includes(role)}
                        <InviteMemberForm {data} team={data.team} />
                    {/if}
                </tbody>
            </table>
        </div>

        <div class="panel">
            <div class="head">
                <h4>Create new project</h4>
            </div>
            <div class="body">
                <Form
                    buttonText="Create project in team '{data.team.name}'"
                    url="/api/project/add"
                    method="POST"
                    body={{
                        teamId: data.team?._id,
                        userId: data.userData?._id
                    }}
                >
                    <div class="field">
                        <label for="add-project-form_name">Project name</label>
                        <input type="text" name="name" required>
                    </div>
                </Form>
            </div>
        </div>
    </div>
{/if}
