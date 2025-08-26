<script lang="ts">
    import type { Data, Team } from "../../../lib/types.js";
    import Form from "../../../components/Form.svelte";

    const {
        data,
        team
    }: {
        data: Data,
        team: Team
    } = $props()


</script>


<tr>
    <td colspan="100">
        <Form 
            buttonText="Invite user"
            url="/api/user/invite"
            method="POST"
            body={{
                teamId: team._id,
                inviter: data.userData?._id
            }}
            style="padding: 0; border: 0;"
        >
            <div class="field">
                <input style="grid-column: span 2;" type="text" aria-label="Invite user" name="invitee" placeholder="Enter name" required>
            </div>
        </Form>
    </td>
</tr>
