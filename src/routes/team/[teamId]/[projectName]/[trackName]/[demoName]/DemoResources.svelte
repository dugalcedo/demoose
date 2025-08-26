<script lang="ts">
    import type { Demo } from "../../../../../../lib/types.js";
    const { demo }: { demo: Demo } = $props()
</script> 

<table class="demo-resources">
    <tbody>
        <tr>
            <th>Audio URL</th>
            <td>{demo.audio_url || "N/A"}</td>
            <td>
                <button>
                    {demo.audio_url ? 'Edit' : 'Add'}
                </button>
            </td>
        </tr>
        <tr>
            <th>Project Files URL</th>
            <td>{demo.project_url || "N/A"}</td>
            <td>
                <button>
                    {demo.project_url ? 'Edit' : 'Add'}
                </button>
            </td>
        </tr>
    </tbody>
</table>

<style>
    table {
        font-size: .8rem;

        & tr {
            & > * {
                &:nth-child(1) {
                    width: 150px;
                }
                &:nth-child(2) {
                    width: 150px;
                }
            }
        }
    }
</style>