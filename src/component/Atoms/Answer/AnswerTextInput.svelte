<textarea class={`qsc-question-answer-container-input relative float-left w-[calc(100%-135px)] h-[34px] min-h-[34px] mr-[3px] font-sans text-base border-[1px] border-solid border-zinc-400 pt-[4px] pl-[5px] opacity-1 resize-none ${$$props.class}`} class:resize-y={resize} class:bg-lime-500={correct} class:text-white={correct} placeholder="Answer" bind:value={value} bind:this={textarea} on:keydown on:keyup on:paste></textarea>
    
<script lang="ts">

    export let value = "";
    export let correct = false;
    export let resize = false;

    let textarea: HTMLTextAreaElement;

</script>