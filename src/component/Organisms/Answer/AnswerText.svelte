<AnswerContainer class={`Text ${$$props.class}`}>
    <AnswerTextInput bind:value={data.value} bind:correct={data.isCorrect} resize={true} on:keydown on:paste />
    <AnswerCorrectCheckbox bind:checked={data.isCorrect} />

    <AnswerDuplicateButton on:click={duplicateAnswer} />
    <AnswerDeleteButton on:click={deleteAnswer} />
    <AnswerSettingsButton on:click={toggleEval} />

    <AnswerEvalSettings ansId={data.id} show={showEval} bind:isCaseSens={data.isCaseSensitive} bind:whitespace={data.whitespace}></AnswerEvalSettings>
    <RichTextEditor class="qsc-question-answer-container-feedback w-full mt-[7px]" placeholder="Answer-specific feedback" bind:value={data.feedback} />
</AnswerContainer>

<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    import AnswerContainer from "../../Atoms/Answer/AnswerContainer.svelte";
    import AnswerTextInput from "../../Atoms/Answer/AnswerTextInput.svelte";
    import AnswerCorrectCheckbox from "../../Atoms/Answer/AnswerCorrectCheckbox.svelte";
    import AnswerEvalSettings from "./AnswerEvalSettings.svelte";
    import RichTextEditor from "../RichTextEditor.svelte";
    import AnswerDuplicateButton from "../../Atoms/Answer/AnswerDuplicateButton.svelte";
    import AnswerDeleteButton from "../../Atoms/Answer/AnswerDeleteButton.svelte";
    import AnswerSettingsButton from "../../Atoms/Answer/AnswerSettingsButton.svelte";

    import type { IAnswer } from "../../../interfaces/IAnswer";
    
    export let data: IAnswer;
    export let index: number;

    const dispatch = createEventDispatcher();

    let showEval = false;

    function toggleEval(): void {
		showEval = !showEval;
	}

    function duplicateAnswer(): void {
        dispatch("duplicate", { index: index });
    }

    function deleteAnswer(): void {
        dispatch("delete", { index: index });
    }

</script>