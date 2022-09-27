<div class={`ldl-util-richeditor group relative float-left text-black ${$$props.class}`}>

    <RichTextArea class="min-h-[65px]" placeholder={placeholder} bind:value />
    <RichTextOptions />
</div>

<script lang="ts">

    export let placeholder = "Type text here";
    export let value = "";

    import RichTextArea from "../Molecules/RichTextEditor/RichTextArea.svelte";
    import RichTextOptions from "../Molecules/RichTextEditor/RichTextOptions.svelte";

</script>