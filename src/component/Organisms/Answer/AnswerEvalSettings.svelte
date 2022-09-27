<div class:hidden={!show} class="qsc-question-answer-eval-settings relative float-right w-[130px] h-[140px] top-[6px] right-[5px] mb-[11px] p-[5px] text-zinc-600 bg-white shadow-sm outline outline-2 outline-lime-500 z-[1] after:content-[''] after:absolute after:w-[2px] after:h-[6px] after:-top-[9px] after:right-[10px] after:bg-lime-500">

    <AnswerEvalSettingsCheckbox label="case sensitive" bind:checked={isCaseSens} />

    <div class="qsc-question-answer-eval-settings-separator relative float-left w-[calc(100%-4px)] h-[2px] m-[2px] bg-zinc-300"></div>

    <p class="qsc-question-answer-eval-settings-whitespace-header float-left w-full mx-0 my-[2px] text-xs text-center text-zinc-400">white space handling</p>

    <div class="relative float-left w-full mx-0 my-[3px]">
        <AnswerEvalSettingsRadio name={"eval-" + ansId} bind:bindGroup={whitespace} value={0} label="maintain" />
        <AnswerEvalSettingsRadio name={"eval-" + ansId} bind:bindGroup={whitespace} value={1} label="make single" />
        <AnswerEvalSettingsRadio name={"eval-" + ansId} bind:bindGroup={whitespace} value={2} label="discard" />
    </div>

</div>

<script lang="ts">

    import AnswerEvalSettingsCheckbox from "../../Molecules/Answer/AnswerEvalSettingsCheckbox.svelte";
    import AnswerEvalSettingsRadio from "../../Molecules/Answer/AnswerEvalSettingsRadio.svelte";

    export let ansId: string;
    export let show = false;
    export let isCaseSens = false;
    export let whitespace = 2;

</script>