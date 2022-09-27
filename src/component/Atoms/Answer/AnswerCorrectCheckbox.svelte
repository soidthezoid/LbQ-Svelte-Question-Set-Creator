<input type="checkbox" class="qsc-question-answer-container-correct-check relative float-left w-[30px] h-[30px] m-0 mr-[4px] cursor-pointer" title="Tick to make this a correct answer" name="correct" bind:checked={checked} bind:this={input} on:click /> <!-- NOTE: on:click (no handler) means click is forwarded to parent -->
        
<script lang="ts">

    import { onMount } from "svelte";

    export let checked = false;
    export let style = { };

    let input: HTMLInputElement;

    onMount( () => {
        for (let s in style) { let inputStyle = input.style as Record<string, unknown>; inputStyle[s] = style[s]; }
    });

</script>