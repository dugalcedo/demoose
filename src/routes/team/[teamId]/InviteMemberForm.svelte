<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import type { Data, Team } from "../../../lib/types.js";
    import { getErrorMessage } from "../../../lib/index.js";
    const {
        data,
        team
    }: {
        data: Data,
        team: Team
    } = $props()

    let inviteError = $state("")

    const handleInvite: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if (!data.userData) {
            inviteError = "MISSING CONTEXT"
            return
        }

        const url = "/api/user/invite"
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...Object.fromEntries(new FormData(e.currentTarget)),
                teamId: team._id,
                inviter: data.userData._id
            })
        }

        const res = await fetch(url, options)

        if (!res.ok) {
            inviteError = await getErrorMessage(res)
            return
        }

        window.location.reload()
    }

</script>


<tr>
    <td colspan="100">
        <form onsubmit={handleInvite}>
            <div class="field">
                <input style="grid-column: span 2;" type="text" aria-label="Invite user" name="invitee" placeholder="Enter name" required>
            </div>
            <button>Invite user</button>
            <span class="error">{inviteError}</span>
        </form>
    </td>
</tr>

<style>
    form {
        padding: 0;
        border: 0;
    }
</style>