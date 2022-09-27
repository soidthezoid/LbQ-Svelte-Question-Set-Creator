<div class="qsc-level-option-area relative float-left w-full lg:w-[calc(100%-390px)] h-full mr-[5px] mb-[10px] lg:mb-0">
    <div class="qsc-level-arrow relative w-0 h-0 float-left top-[9px] mr-[9px] border-t-[15px] border-t-solid border-t-white border-r-[11px] border-r-solid border-r-transparent border-l-[11px] border-l-solid border-l-transparent transition-transform origin-center duration-200 cursor-pointer" class:-rotate-90={data.collapsed} on:click={onToggle}></div>
    <div class={computedHandleClass}>Level {data.level }</div>
    <DuplicateButton name="duplicate" class="mr-1" title="Duplicate this level" on:click />
    <DeleteButton name="delete" class="mr-1" title="Delete this level" disabled={firstLevel} on:click />
    <AddButton name="add" class="mr-1" title="Add a question to this level" on:click />
    <textarea class="qsc-level-name relative float-left w-[calc(100%-39px)] sm:w-[calc(100%-255px)] h-[30px] min-h-[30px] mt-[10px] sm:mt-0 mr-[3px] ml-[30px] sm:ml-0 pt-[4px] pr-[2px] pb-[2px] pl-[5px] text-black border-solid border-1 border-gray-500 resize-vertical" placeholder="Level name" bind:value={data.levelName}></textarea>
</div>

<script lang="ts">
    
    import { createEventDispatcher } from "svelte";

    import DuplicateButton from "../../Atoms/DuplicateButton.svelte";
    import DeleteButton from "../../Atoms/DeleteButton.svelte";
    import AddButton from "../../Atoms/AddButton.svelte";
    
    import type { ILevel } from "../../../interfaces/ILevel";

    export let data: ILevel;
    export let firstLevel: boolean;
    
    const dispatch = createEventDispatcher();
    
    let computedHandleClass = "qsc-level-handle sort-handle relative float-left w-[78px] t-[2px] h-[31px] mr-[6px] px-[10px] leading-8 bg-white outline outline-1 outline-gray-400 font-bold text-left text-gray-400 cursor-move after:content-[''] after:absolute after:w-0 after:h-0 after:top-[2px] after:right-[2px] after:border-r-[3px] after:border-r-solid after:border-r-transparent after:border-l-[3px] after:border-l-solid after:border-l-transparent after:border-b after:border-b-[5px] after:border-b-gray-400 before:content-[''] before:absolute before:w-0 before:h-0 before:bottom-[2px] before:right-[2px] before:border-r-[3px] before:border-r-solid before:border-r-transparent before:border-l-[3px] before:border-l-solid before:border-l-transparent before:border-t before:border-t-[5px] before:border-t-gray-400" + (firstLevel ? " after:hidden before:hidden cursor-default" : "");

    function onToggle() {
        if (data.questions.length > 0) { data.collapsed = !data.collapsed; dispatch("toggle"); }
    }

</script>


<style lang="scss">

    /*@media only screen and (max-width: 730px) { 
        .qsc-level-option-area { width: 100%; margin-bottom: 10px; }
    }

    @media only screen and (max-width: 410px) { 
        .qsc-level-name{ width: calc(100% - 39px); margin-top: 10px; margin-left: 30px;}
    }*/

</style>