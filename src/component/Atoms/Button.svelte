

<div title={title} name={name} id={`${$$props.id}`} class={`qsc-button text-center rounded-sm bg-contain opacity-${opacity} ${$$props.class}`} class:!bg-zinc-400={disabled} class:cursor-pointer={!disabled} bind:this={button} disabled={disabled} on:click >
    <slot></slot>
</div>

<script lang="ts">

    import { onMount } from 'svelte';

    export let name = "";
    export let backgroundClass = "";
    export let title = "";
    export let opacity = "100";
    export let disabled = false;

    // experimental: export let tailwind: { [key: string]: string; } = { textAlign: "text-center", cursor: "cursor-pointer", borderRadius: "rounded-sm", backgroundSize: "bg-contain" };

    let button: HTMLDivElement;

    onMount( () => {
        button.style.position = "relative";
        button.style.width = "30px";
        button.style.height = "30px";
        if (backgroundClass !== "") { button.classList.add(backgroundClass); }
    });


</script>