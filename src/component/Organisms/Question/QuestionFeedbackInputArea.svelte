 <div class="qsc-question-feedback-input-area correct-fb relative float-left w-[calc(33%-7px)] mx-0 my-[2px] mr-[10px]">
    <p class="qsc-question-feedback-input-area-label relative float-left w-[63px] m-0 mr-[10px] text-white text-right leading-7 ">{label}</p>
    <RichTextEditor class="qsc-question-feedback-input-area-input relative float-left w-[calc(100%-73px)]" placeholder={placeholder} bind:value></RichTextEditor>
</div>

<script lang="ts">

    import RichTextEditor from "../RichTextEditor.svelte";

    export let label = "";
    export let value = "";
    export let placeholder = "";

</script>