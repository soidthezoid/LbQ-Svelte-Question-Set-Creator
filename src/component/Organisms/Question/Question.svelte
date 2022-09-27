<div class="qsc-question relative w-full h-auto min-h-[65px] bg-gray-300 p-[10px] text-zinc-900 font-sans rounded-none overflow-hidden">

    <QuestionExtra />

    <QuestionArea
        bind:data={data}
        num={num}
        on:click={processClick}
    />

    <QuestionAnswerArea
        bind:data={data}
        bind:levelQuestion={levelQuestion}
        on:click={processClick}
    />

    <QuestionFeedbackArea
        bind:data={data}
        show={showFeedback}
        on:click={processClick}
    />

</div>

<script lang="ts">

    import {createEventDispatcher} from "svelte";

    import QuestionExtra from "../../Molecules/Question/QuestionExtra.svelte";
    import QuestionArea from "./QuestionArea.svelte";
    import QuestionAnswerArea from "./QuestionAnswerArea.svelte";
    import QuestionFeedbackArea from "./QuestionFeedbackArea.svelte";

    import type { ILevelQuestion } from "../../../interfaces/ILevelQuestion";
    import type { IQuestion } from "../../../interfaces/IQuestion";
    
    export let data: IQuestion;
    export let num: number;
    export let levelQuestion: ILevelQuestion;
    
    const dispatch = createEventDispatcher();

    let showFeedback = false;

    function processClick(e: MouseEvent): void {
        let target = e.target as Element;
        let name = target.getAttribute("name");
        if (name === "duplicate") { dispatch("duplicatequestion", { data: data }); }
        if (name === "delete") { dispatch("deletequestion", { data: data }); }
        if (name === "feedback" || name === "feedback-minimise") { showFeedback = !showFeedback; }
    }

    // ************* TBD: ATTEMPT TO REMOVE ${$$props.class} FROM COMPONENT TEMPLATE ROOTS WHEREVER CLASSES DON'T NEED TO BE PASSED IN ***************

</script>