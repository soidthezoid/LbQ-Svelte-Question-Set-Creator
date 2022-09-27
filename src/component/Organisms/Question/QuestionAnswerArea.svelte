<div class="qsc-question-answer-area relative float-left w-[calc(50%-10px)] min-h-[32px]">
    <div
        class="qsc-question-answer-retries qsc-retries relative w-full text-base mt-[7px] mr-0 mb-[3px] ml-[30px] z-[1] overflow-hidden"
        title="Answer retries allowed for this question"
    >

        <div class="float-left mr-[5px]">Retries: </div>
            <input
                class="float-left w-[40px] h-[24px] text-base text-center"
                type="number"
                min="0"
                max="99"
                bind:value={levelQuestion.retries}
            />
    </div>

    {#if data.answers.length > 0}
        <div class="qsc-question-collapse-answer-element relative w-full min-h-[32px]">
            <div class:-rotate-90={collapsed}
                 class="qsc-question-collapse-icon relative float-left w-0 h-0 top-[6px] mr-[5px] border-solid border-t-[15px] border-t-gray-500 border-r-[11px] border-r-transparent border-l-[11px] border-l-transparent transition-transform duration-200 ease cursor-pointer"
                 title="Expand/collapse answer area"
                 on:click={toggle}
            ></div>

            {#if collapsed}
                <div class="qsc-question-collapsed-container relative float-left w-[calc(100%-27px)] min-h-[32px]">
                    <p class="qsc-question-answers-summary w-[calc(100%-14px)] h-auto m-[2px] p-[2px] bg-white outline outline-1 outline-zinc-400">{summary}</p>
                </div>
            {:else}
                <div class="qsc-question-expanded-container relative float-left w-[calc(100%-27px)] min-h-[65px]">
                    <div class="qsc-question-answers-holder relative w-full">
                        {#if data.type !== "Text" && data.type !== "Numeric"}
                            <DraggableList 
                                data={list} 
                                class="w-full"
                                key="id"
                                restrict={{ top: true, right: true, bottom: true, left: true }}
                                on:sort={sortList}
                                let:item
		                        let:index
                            >
                                <svelte:component
                                    this={answerComponent}
                                    qId={data.id}
                                    data={item}
                                    index={index}
                                    on:duplicate={duplicateAnswer}
                                    on:delete={deleteAnswer}
                                    on:keydown={onAnswerKeyDown}
                                    on:paste={onAnswerPaste}
                                    on:correctclick={onCorrectClick}
                                />
                            </DraggableList>
                        {:else}
                            {#each data.answers as ans, i (ans.id)}
                                <svelte:component
                                    this={answerComponent}
                                    qId={data.id}
                                    bind:data={ans}
                                    index={i}
                                    on:duplicate={duplicateAnswer}
                                    on:delete={deleteAnswer}
                                    on:keydown={onAnswerKeyDown}
                                    on:paste={onAnswerPaste}
                                />
                            {/each}
                        {/if}
                    </div>
                </div>
                {#if canAdd}
                    <AddButton
                        title="Add an answer"
                        on:click={addAnswer}
                    />
                {/if}
            {/if}
        </div>
    {:else}
        <AddButton
            on:click={addAnswer}
        />
        <p class="qsc-text-question-answer-placeholder relative float-left w-[calc(100%-62px)] ml-[10px]">{summary}</p>
    {/if}
</div>

<script lang="ts">

    import { getContext } from "svelte";

    import DraggableList from "../DraggableList.svelte";
    import AnswerText from "../Answer/AnswerText.svelte";
    import AnswerNumeric from "../Answer/AnswerNumeric.svelte";
    import AnswerBinary from "../Answer/AnswerBinary.svelte";
    /*import AnswerMult from "../Answer/AnswerMult.svelte";
    import AnswerSort from "../Answer/AnswerSort.svelte";*/
    import AddButton from "../../Atoms/AddButton.svelte";
    
    import type { ILevelQuestion } from "../../../interfaces/ILevelQuestion";
    import type { IQuestion } from "../../../interfaces/IQuestion";
    import type { IAnswer } from "../../../interfaces/IAnswer";

    import { Utils } from "../../../utils/Utils";
    
    export let data: IQuestion;
    export let levelQuestion: ILevelQuestion;

    const openPopup = getContext(Utils.CREATOR_KEY).openPopup as unknown;

    let collapsed = true;
    let summary: string;
    let answerComponent: AnswerText | AnswerNumeric | AnswerBinary;
    let sortList = (ev: CustomEvent) => { data.answers = ev.detail as Array<IAnswer>; }

    $: canAdd = data.type !== "YesNo" && data.type !== "TrueFalse";
    $: list = data.answers;

    $: {
        switch(data.type) {
            case "Text": answerComponent = AnswerText; break;
            case "Numeric": answerComponent = AnswerNumeric; break;
            case "YesNo": answerComponent = AnswerBinary; break;
            case "TrueFalse": answerComponent = AnswerBinary; break;
        }
        
        if (data.answers) {
            if (data.type === "YesNo" || data.type === "TrueFalse") {
                
            }
            if (data.answers.length === 0) {
                summary = "Add correct/incorrect answer values or leave for open answer";
            } else {
                summary = "Correct answers(s): ";
                for (let i = 0; i < data.answers.length; i++) {
                    if (data.answers[i].isCorrect) {
                        summary += (summary !== "Correct answers(s): " ? " | " : "") + data.answers[i].value;
                    }
                }
                if (summary === "Correct answers(s): ") {
                    summary = "Open question, any answer accepted.";
                }
            }
        }
    }

    function toggle(): void {
        collapsed = !collapsed;
        if (collapsed) { removeEmptyAnswers(); }
    }

    function addAnswer(): void {
        data.answers = [ ...data.answers, { id: Utils.createGuid(), value: "", feedback: "", isCaseSensitive: false, isCorrect: false, whitespace: 2} ];
        collapsed = false;
    }

    function onCorrectClick(e: CustomEvent): void {
        let detail = e.detail as Record<string, unknown>;
        data.answers[detail.index === 0 ? 1 : 0].isCorrect = !detail.value;
    }
    
    function duplicateAnswer(e: CustomEvent): void {
        let detail = e.detail as { index: number };
        let copy: IAnswer = Utils.copyObject(data.answers[detail.index], { uniqueId: true }) as IAnswer;
        data.answers.splice(detail.index + 1, 0, copy);
        data.answers = data.answers;
    }

    function deleteAnswer(e: CustomEvent): void {
        let detail = e.detail as { index: number };
        openPopup( { header: "Attention", msg: "Are you sure you want to delete this answer?", small: "[Hold SHIFT to delete without prompt]", buttons: [ { label: "Ok", callback: () => { doDeleteAnswer(detail.index); }}, { label: "Cancel" } ] } );
    }

    function doDeleteAnswer(delIndex: number): void {
        data.answers = data.answers.filter(function(el, index) { return index !== delIndex; });
    }

    function removeEmptyAnswers(): void {
        data.answers = data.answers.filter(function(el) { return el.value !== "" || el.feedback !== ""; });
    }

    function onAnswerKeyDown(e: KeyboardEvent): void {
        let t = (<HTMLInputElement>e.target);
        let numWhitelist = [ "-", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Delete", "Backspace", "Tab", "ArrowLeft", "ArrowRight" ];
        let selEnd = Utils.getCursorPos(e.target).end;
        if (data.type === "Numeric" && (numWhitelist.indexOf(e.key) === -1 || e.key === "-" && selEnd > 0 || (e.key === "Delete" && selEnd === 0 && t.value.indexOf(".") === 1) || (e.key === "." && (selEnd === 0 || t.value.indexOf(".") !== -1)))) { e.preventDefault(); }
    }

    function onAnswerPaste(e: ClipboardEvent): void {
        if (data.type === "Numeric") { e.preventDefault(); }
    }

</script>