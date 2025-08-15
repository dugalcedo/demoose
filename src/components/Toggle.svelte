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
        & button {
            background-color: transparent;

            &.selected {
                background-color: lightgray;
            }
        }
    }
</style>