<Button class={`relative float-left leading-8 bg-duplicate bg-sky-500 ${$$props.class}`} name={name} title={title} disabled={disabled} on:click />

<script lang="ts">

    import Button from "./Button.svelte";

    export let name = "";
    export let title = "";
    export let disabled = false;

</script>