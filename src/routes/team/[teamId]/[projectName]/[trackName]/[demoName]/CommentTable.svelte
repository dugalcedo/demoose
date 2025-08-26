<script lang="ts">
    import { type Comment } from "../../../../../../lib/types.js";
    const { comments } : { comments: Comment[] } = $props()
    const pad0 = (n: number) => (n < 10 ? "0":"") + Math.round(n);
    const parseTimestamp = (n: number) => {
        const m = Math.floor(n/1000/60)
        const s = Math.round((n/1000) - (m*60))
        return `${pad0(m)}:${pad0(s)}`
    }
</script>

<table>
    <caption>Comments</caption>
    <thead>
        <tr>
            <th>Comment</th>
            <th>Author</th>
            <th>Timetamp</th>
        </tr>
    </thead>
    <tbody>
        {#each comments as comment}
            <tr>
                <td>{comment.body}</td>
                <td>{comment.author.displayName}</td>
                <td>{parseTimestamp(comment.timestamp)}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        font-size: .7rem;
        margin-bottom: 4rem;

        & tr {
            & > td, th {
                &:first-child {
                    width: 60%;
                }
                &:nth-child(2) {
                    width: 30%;
                }
            }
        }
    }
</style>