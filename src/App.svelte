<svelte:window
    on:resize={onResize}
/>

<main
    class="w-full h-full overflow-hidden"
    class:hidden={!mounted}
>
    
    <div
        class="left relative float-left w-[calc(100%-140px)] h-full"
    >

        <Button
            class="float-right m-1 p-1 text-zinc-500 !outline !outline-1 !outline-zinc-500 !w-[80px]"
            on:click={model.logJSON}
        >
            Log JSON
        </Button>

        <Button
            class="float-right m-1 p-1 text-zinc-500 !outline !outline-1 !outline-zinc-500 !w-[80px]"
            on:click={model.addQuestion}
        >
            Add Q
        </Button>

        <DraggableList
            data={$visListStore}
            bind:this={sortableList}
            class="main-list w-full overflow-y-auto"
            key="id"
            liClass="mb-[10px]"
            restrict={{ left: true, right: true }}
            lockFirstNode={true}
            dragHandleClass="sort-handle"
            on:sort={model.sortList}
            on:dragend={model.listDragEnd}
            let:item
		    let:index
        >
            {#if item.questions}
                <Level
                    data={item}
                    firstLevel={index === 0}
                    levelInfo={model.getLevelInfo(item)}
                    on:duplicatelevel={model.duplicateLevel}
                    on:deletelevel={model.deleteLevel}
                    on:addlevelquestion={model.addLevelQuestion}
                    on:duplicatequestion={model.duplicateQuestion}
                    on:deletequestion={model.deleteQuestion}
                    on:toggle={model.updateVisList}
                />
            {:else if item.answers}
                <Question
                    data={item}
                    num={model.getQuestionNumber(item)}
                    levelQuestion={model.getLevelQuestion(item)}
                    on:duplicatelevel={model.duplicateLevel}
                    on:deletelevel={model.deleteLevel}
                    on:addlevelquestion={model.addLevelQuestion}
                    on:duplicatequestion={model.duplicateQuestion}
                    on:deletequestion={model.deleteQuestion}
                    on:toggle={model.updateVisList}
                />
            {:else}
                <AddButton />
            {/if}

        </DraggableList>

    </div>

    <div class="right relative float-left w-[140px] h-full">
        <CreativePanel
            targetList={sortableList}
            on:dragend={model.creativePanelDragEnd}
            on:externalhit={model.creativePanelDragInsert}
            on:outsidetargetlist={model.removeInsertMarker}
            on:buttonclick={model.creativePanelClickInsert}
        />
    </div>

</main>

<script lang="ts">

    import {onMount, setContext} from "svelte";
    import * as model from "../model/Model";
    import { Utils } from "../utils/Utils";
    import Level from "../component/Organisms/Level/Level.svelte";
    import Question from "../component/Organisms/Question/Question.svelte";
    import DraggableList from "../component/Organisms/DraggableList.svelte";
    import Button from "../component/Atoms/Button.svelte";
    import AddButton from "../component/Atoms/AddButton.svelte";
    import CreativePanel from "../component/Molecules/CreativePanel.svelte";
    
    let mounted = false;
    let visListStore = model.visListStore as Record<string, unknown>; // NOTE: WE USE A STORE TO WRAP model.visList SINCE IF A COMPONENT DIRECTLY REFERENCES A VALUE IN AN EXTERNAL FILE IT WON'T BE REACTIVE https://stackoverflow.com/questions/57983689/how-does-svelte-handle-reactivity-inside-imports
    let sortableList: Record<string, unknown>;
    
    /************** TBD: ADOPT SINGLE APPROACH TO COMPONENT CSS OVERRIDES I.E. EITHER PASS IN STYLE OBJECT OR PASS !IMPORTANT TAILWIND CLASSES INTO CLASS PROPERTY ***************/ 
    
    setContext(Utils.CREATOR_KEY, { openPopup: model.openPopup }); // NOTE: Context is not inherently reactive. Therefore we are passing stores (which ARE reactive) into context.
    
    onMount( () => { mounted = true; onResize(); });
    
    function onResize(): void {
        let list = document.getElementsByClassName("main-list")[0] as Record<string, unknown>; list.style.height = String(window.innerHeight - 40) + "px";
    }
    
</script>

<style lang="scss">

    :global {
        body { overflow: hidden; cursor: default; }
        .ldl-ui-no-select { -webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -select: none; outline: none; }
    }

</style>