<script lang="ts">
    type ToggleOption = {
        text: string
        value?: string
        onChoose?: (text: string) => (void | Promise<void>)
    }

    let { 
        options,
        value = $bindable(options[0].text)
    } : {
        options: ToggleOption[]
        value?: string
    } = $props()

    if (options.length == 0) throw new Error(`A Toggle component must have at least one option.`);

</script>

<div class="toggle">
    {#each options as option, i (option)}
        <button 
            class:selected={value == (option.value || option.text)}
            type="button"
            onclick={async () => {
                value = (option.value || option.text)
                if (option.onChoose) await option.onChoose(option.text)
            }}
        >
            {option.text}
        </button>
    {/each}
</div>

<style>
    .toggle {
        & > button {

            &.selected {
                background-color: rgb(52, 216, 180);
                color: var(--bg);
                border-color: rgb(0, 114, 80);
            }

            border-radius: 0;

            &:first-child {
                border-radius: .25rem 0 0 .25rem;
            }

            &:last-child {
                border-radius: 0 .25rem .25rem 0;
            }
        }
    }
</style>