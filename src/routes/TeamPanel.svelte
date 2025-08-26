<script lang="ts">
    import { type UserData } from "../lib/types.js";
    const { userData } : { userData: UserData } = $props()
    import TeamPanelTr from "./TeamPanelTR.svelte";
    import Form from "../components/Form.svelte";

</script>

<div class="team-panel">
    <div class="panels">
        {#if userData.teams.length == 0}
            <p>You do not have any teams.</p>
        {:else}
            <div class="panel">
                <div class="head">
                    <h3>Your teams</h3>
                </div>
                <div class="body">
                    <table>
                        <thead>
                            <tr>
                                <th>Team name</th>
                                <th>Your role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each userData.teams as team, i (team._id)}
                                <TeamPanelTr {team} {userData} />
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        {/if}
        <div class="panel">
            <div class="head">
                <p>Create a team</p>
            </div>
            <div class="body">
                <Form
                    class="create-team-form"
                    url="/api/team/add"
                    method="POST"
                    body={{ userId: userData._id }}
                    buttonText="Create team"
                >
                    <div class="field">
                        <label for="create-team-form_name">Team name</label>
                        <input type="text" required name="name">
                    </div>
                </Form>
            </div>
        </div>
    </div>
</div>