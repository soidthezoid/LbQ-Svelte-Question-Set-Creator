<div class:hidden={!show} class="qsc-question-feedback-area relative float-left w-[calc(100%+20px)] -left-[10px] top-[6px] p-[6px] bg-zinc-400">

    <Button name="feedback-minimise" class="feedback-minimise relative float-left bg-feedback-minimise bg-amber-500" on:click />

    <p class="qsc-question-feedback-area-label relative float-left w-[95px] h-full m-0 ml-[10px] text-white leading-8">Feedback</p>

    <div class="qsc-question-feedback-area-input-holder relative float-left w-[calc(100%-135px)]">
        <QuestionFeedbackInputArea label="Correct" placeholder="Correct feedback" bind:value={data.rightFeedback} />
        <QuestionFeedbackInputArea label="Incorrect" placeholder="Incorrect feedback" bind:value={data.wrongFeedback} />
        <QuestionFeedbackInputArea label="Open" placeholder="Open feedback" bind:value={data.openFeedback} />
    </div>
</div>

<script lang="ts">

    import Button from "../../Atoms/Button.svelte";
    import QuestionFeedbackInputArea from "./QuestionFeedbackInputArea.svelte";

    import type { IQuestion } from "../../../interfaces/IQuestion";

    export let show = false;
    export let data: IQuestion;

</script>