<div class={`ldl-util-richeditor-textarea relative bg-white outline outline-1 outline-zinc-400 w-full h-auto p-[5px] cursor-text group-disabled:opacity-80 ${$$props.class}`} bind:this={root}>
    <div class="ldl-util-richeditor-placeholder w-full h-full opacity-50" class:hidden={!placeholderVis} on:click={onFocus}>{placeholder}</div>
    <div class="outline-none" class:hidden={placeholderVis} contenteditable="true" bind:textContent={value} on:blur={onBlur} bind:this={input}></div>    
</div>

<script lang="ts">

    export let placeholder = "Type text here";
    export let value = "";

    let placeholderVis = value === "";
    let input: HTMLInputElement;
    let root;

    function onFocus(): void {
        placeholderVis = false;
        
        setTimeout( () => { input.focus(); }, 10);
    }

    function onBlur(): void {
        if (value === "") { placeholderVis = true; }
    }

</script>