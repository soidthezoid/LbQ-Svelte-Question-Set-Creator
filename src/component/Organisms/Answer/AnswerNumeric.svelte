<AnswerContainer class={`Numeric ${$$props.class}`}>
    <AnswerTextInput class="!w-[calc(100%-101px)]" bind:value={data.value} bind:correct={data.isCorrect} resize={false} on:keydown on:paste />
    <AnswerCorrectCheckbox bind:checked={data.isCorrect} />

    <AnswerDuplicateButton on:click={duplicateAnswer} />
    <AnswerDeleteButton class="!mr-0" on:click={deleteAnswer} />
    
    <RichTextEditor class="qsc-question-answer-container-feedback w-full mt-[7px]" placeholder="Answer-specific feedback" bind:value={data.feedback} />
</AnswerContainer>

<script lang="ts">

    import { createEventDispatcher } from 'svelte';

    import AnswerContainer from "../../Atoms/Answer/AnswerContainer.svelte";
    import AnswerTextInput from "../../Atoms/Answer/AnswerTextInput.svelte";
    import AnswerCorrectCheckbox from "../../Atoms/Answer/AnswerCorrectCheckbox.svelte";
    import RichTextEditor from "../RichTextEditor.svelte";
    import AnswerDuplicateButton from "../../Atoms/Answer/AnswerDuplicateButton.svelte";
    import AnswerDeleteButton from "../../Atoms/Answer/AnswerDeleteButton.svelte";
    
    import type { IAnswer } from "../../../interfaces/IAnswer";
    
    export let data: IAnswer;
    export let index: number;

    const dispatch = createEventDispatcher();

    function duplicateAnswer(): void {
        dispatch("duplicate", { index: index });
    }

    function deleteAnswer(): void {
        dispatch("delete", { index: index });
    }

</script>