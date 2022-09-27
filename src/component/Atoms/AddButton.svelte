<Button class={`relative float-left leading-8 bg-lime-500 after:absolute after:-top-[6px] after:left-[6px] after:m-0 after:content-['+'] after:font-extrabold after:text-white after:leading-10 after:text-2xl after:text-center ${$$props.class}`} name={name} title={title} disabled={disabled} on:click />

<script lang="ts">

    import Button from "./Button.svelte";

    export let name = "";
    export let title = "";
    export let disabled = false;

</script>