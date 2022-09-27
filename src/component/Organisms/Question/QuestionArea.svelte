<div class="qsc-question-area relative float-left w-1/2 h-auto mr-2.5">
    <div class="qsc-question-option-holder relative float-left w-[65px] h-[65px] mr-2.5">

        <!-- NOTE 1: REMOVED QuestionOption COMPONENT AND ADDED ITS STYLES ( float-left mb-1 leading-8 ) DIRECTLY TO ITS CHILDREN (Button) -->
        <!-- NOTE 2: on:click (no handler) means click is forwarded to parent -->

        <Button
            title="Drag to reposition question"
            name="drag"
            class="sort-handle float-left mb-1 leading-8 mr-1 text-center font-bold bg-white outline-1 outline outline-zinc-400 text-zinc-400 cursor-move"
            on:click>
                {num}
        </Button>

        <Button
            title="Show/hide question feedback"
            name="feedback"
            class="float-left mb-1 leading-8 bg-feedback bg-amber-500"
            on:click
        />

        <DuplicateButton
            class="mr-1"
            title="Duplicate this question"
            name="duplicate"
            on:click
        />

        <DeleteButton
            title="Delete this question"
            name="delete"
            on:click
        />

    </div>

    <QuestionAreaRichTextEditor
        class="qsc-question-textarea w-3/5 h-full mr-2"
        placeholder="Add your question text here"
        bind:value = {data.value}
    />

    <QuestionSupplement />

    <TypeSelect
        bind:value={data.type}
        on:change={onTypeChange}
    />

</div>

<script lang="ts">
    
    import Button from "../../Atoms/Button.svelte";
    import DuplicateButton from "../../Atoms/DuplicateButton.svelte";
    import DeleteButton from "../../Atoms/DeleteButton.svelte";
    import QuestionAreaRichTextEditor from "../QuestionAreaRichTextEditor.svelte";
    import QuestionSupplement from "../../Molecules/Question/QuestionSupplement.svelte";
    import TypeSelect from "./TypeSelect.svelte"; 
    
    import type { IQuestion } from "../../../interfaces/IQuestion";

    import { Utils } from "../../../utils/Utils";

    export let data: IQuestion;
    export let num: number;
    
    let previousType = data.type;

    function onTypeChange(): void {
        switch (data.type) {
            case "Numeric":
                for (let a of data.answers) {
                    if (isNaN(Number(a.value))) {
                        a.value = "";
                        a.isCorrect = false;
                    }
                }
                break;
            case "YesNo":
                var temp1 = [
                    {
                        id: data.answers[0] ? data.answers[0].id : Utils.createGuid(),
                        value: data.answers[0] && (data.answers[0].value === "No" || data.answers[0].value === "False") ? "No" : "Yes",
                        feedback: data.answers[0] ? data.answers[0].feedback : "",
                        isCorrect: previousType === "TrueFalse" ? data.answers[0].isCorrect : false
                    },
                    {
                        id: data.answers[1] ? data.answers[1].id : Utils.createGuid(),
                        value: data.answers[1] && (data.answers[1].value === "Yes" || data.answers[1].value === "True") ? "Yes" : "No",
                        feedback: data.answers[1] ? data.answers[1].feedback : "",
                        isCorrect: previousType === "TrueFalse" ? data.answers[1].isCorrect : false
                    }
                ];
                data.answers = temp1;
                break;
            case "TrueFalse":
                var temp2 = [
                    {
                        id: data.answers[0] ? data.answers[0].id : Utils.createGuid(),
                        value: data.answers[0] && (data.answers[0].value === "No" || data.answers[0].value === "False") ? "False" : "True",
                        feedback: data.answers[0] ? data.answers[0].feedback : "",
                        isCorrect: previousType === "YesNo" ? data.answers[0].isCorrect : false
                    },
                    {
                        id: data.answers[1] ? data.answers[1].id : Utils.createGuid(),
                        value: data.answers[1] && (data.answers[1].value === "Yes" || data.answers[0].value === "True") ? "True" : "False",
                        feedback: data.answers[1] ? data.answers[1].feedback : "",
                        isCorrect: previousType === "YesNo" ? data.answers[1].isCorrect : false
                    }
                ];
                data.answers = temp2;
                break;
            default:
                for (let a of data.answers) { a.isCorrect = false; }
        }        
        previousType = data.type;
    }

</script>