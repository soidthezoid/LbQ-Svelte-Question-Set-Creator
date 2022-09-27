<div class="relative float-left w-full h-full bg-gray-500">

    <DraggableList
        data={list} 
        class="w-full"
        key="id"
        liClass="mb-[10px]"
        targetList={targetList}
        on:externalhit
        on:outsidetargetlist
        on:dragend
        let:item
	    let:index
    >

        <Button id={item.id} class={`bg-gray-600 !w-full !h-[80px] ${item.class}`} on:click={onButtonClick}/>

    </DraggableList>

</div>

<script lang="ts">

    import DraggableList from "../Organisms/DraggableList.svelte";
    import Button from "../Atoms/Button.svelte";
    
    import { createEventDispatcher } from "svelte";

    export let targetList; // NOTE: targetList type is DraggableList

    const dispatch = createEventDispatcher();

    let list = [
        { id: "Level", class: "bg-creative-panel-level" },
        { id: "Text", class: "bg-creative-panel-text-type" },
        { id: "Numeric", class: "bg-creative-panel-numeric-type" },
        { id: "YesNo", class: "bg-creative-panel-yesno-type" },
        { id: "TrueFalse", class: "bg-creative-panel-truefalse-type" }/*,
        { id: "MultipleChoice", class: "bg-creative-panel-mc-type" },
        { id: "Sort", class: "bg-creative-panel-sort-type" }*/
    ];

    function onButtonClick(e: MouseEvent): void {
        dispatch("buttonclick", { target: e.target }); 
    }


</script>