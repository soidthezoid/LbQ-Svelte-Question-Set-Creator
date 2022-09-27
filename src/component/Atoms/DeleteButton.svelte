<Button class={`relative float-left leading-8 bg-red-600 after:absolute after:content-[''] after:w-3/5 after:h-[4px] after:top-[calc(50%-2.5px)] after:left-[calc(50%-9px)] after:bg-white ${$$props.class}`} name={name} title={title} disabled={disabled} on:click />

<script lang="ts">

    import Button from "./Button.svelte";

    export let name = "";
    export let title = "";
    export let disabled = false;

</script>