<AnswerContainer class={`Binary ${$$props.class}`}>
    <div class="relative float-left w-[30px] h-[30px] mr-[17px] mb-[4px] bg-answer-container-sorter cursor-move"></div>
    <div class="ldl-ui-no-select relative float-left w-[calc(100%-82px)] h-[30px] mr-[5px] p-[5px] leading-5 text-white" class:bg-lime-500={data.isCorrect}>{data.value}</div>
    <AnswerCorrectCheckbox class="!mr-0" bind:checked={data.isCorrect} on:click={onCorrectClick} />
    <RichTextEditor class="qsc-question-answer-container-feedback w-full mt-[7px]" placeholder="Answer-specific feedback" bind:value={data.feedback} />
</AnswerContainer>
    
<script lang="ts">

    import AnswerContainer from "../../Atoms/Answer/AnswerContainer.svelte";
    import AnswerCorrectCheckbox from "../../Atoms/Answer/AnswerCorrectCheckbox.svelte";
    import RichTextEditor from "../RichTextEditor.svelte";

    import type { IAnswer } from "../../../interfaces/IAnswer";

    import { createEventDispatcher } from "svelte";
    
    export let data: IAnswer;
    export let index: number;

    const dispatch = createEventDispatcher();
    
    function onCorrectClick(): void {
        setTimeout( () => { dispatch("correctclick", { index: index, value: data.isCorrect }); }, 10);
    }
    
</script>