<Button class={`qsc-question-answer-btn delete float-left leading-8 mb-0 mr-1 bg-red-600 after:absolute after:content-[''] after:w-3/5 after:h-[4px] after:top-[calc(50%-2.5px)] after:left-[calc(50%-9px)] after:bg-white ${$$props.class}`} title="Delete this answer" name="delete" on:click /> <!-- NOTE: on:click (no handler) means click is forwarded to parent -->
        
<script lang="ts">

    import Button from "../Button.svelte";

</script>