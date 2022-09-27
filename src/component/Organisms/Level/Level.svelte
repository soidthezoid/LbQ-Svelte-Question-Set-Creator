<div class={`qsc-level bg-blue-900 ${$$props.class}`}>
    <LevelOptionArea bind:data={data} firstLevel={firstLevel} on:toggle on:click={processClick} />
    <LevelProgressArea bind:data={data} />
    {#if data.collapsed}
        <LevelInfoArea data={data} levelInfo={levelInfo} />
    {/if}
</div>

<script lang="ts">
    
    import { createEventDispatcher } from "svelte";

    import LevelOptionArea from "../../Molecules/Level/LevelOptionArea.svelte";
    import LevelProgressArea from "../../Molecules/Level/LevelProgressArea.svelte";
    import LevelInfoArea from "../../Molecules/Level/LevelInfoArea.svelte";

    import type { ILevel } from "../../../interfaces/ILevel";

    const dispatch = createEventDispatcher();

    export let data: ILevel;
    export let firstLevel: boolean;
    export let levelInfo: string;

    function processClick(e: MouseEvent): void {
        let target = e.target as Element;
        let attributes = target.attributes as Record<string, unknown>;
        let disabled = (<Record<string, unknown>>attributes.disabled).nodeValue === "true";
        let name = attributes.name as Record<string, unknown>;
        
        if (!disabled) {
            if (name.value === "duplicate") { dispatch("duplicatelevel", { levelData: data }); }
            if (name.value === "delete") { dispatch("deletelevel", { levelData: data }); }
            if (name.value === "add") { data.progress++; data.collapsed = false; dispatch("toggle"); setTimeout( () => { dispatch("addlevelquestion", { levelData: data }); }, 100); }
        }
    }

</script>


<style lang="scss">

    .qsc-level{ position: relative; width: 100% /*calc(100% - 20px)*/; height: auto; min-height: 35px; /*background: #048;*/ padding: 10px 10px 0 10px; font-family: Arial, sans-serif; /*margin-bottom: 10px;*/ overflow: hidden; border-radius: 0; color: white; }
        .qsc-level.error{ background: #800; color: white; }
            
            .qsc-level-info-area{ display: none; position: relative; width: calc(100% + 20px); height: 20px; background: rgba(255,255,255, 0.2); top: 10px; left: -10px; float: left; }
            .qsc-level-info-area.error{ background: #800; }
                .qsc-level-info-area-info{ position: relative; margin-left: 10px; text-align: left; line-height: 20px; color: white; font-size: 14px; }

/*-------------------------------------SCROLLBAR SETTINGS-----------------------------------------------------------------------------*/

.qsc-question-set-container.ldl-utils-scrollbarutil-scrollbar-showing .qsc-level{ width: calc(100% - 33px); }

/*-------------------------------------------MEDIA QUERIES-----------------------------------------------------------------------------*.qsc-level
  /*

  *:disabled { cursor: default; }
  article { height: 55px; margin: 0px 0px 2px 0px; padding: 20px 10px 20px 10px; background-color: #a3a036; }
  button { width: 32px; height: 32px; margin: 2px 2px 0px 0px; border: none; padding: 0; }

  .main-cont { width: calc(100% - 20px); height: 100%; margin: 0; }

  .inner { padding: 0; }

  .qsc-level-option-area { width: calc(100% - 400px); margin: 10px 5px 0px 0px; padding: 0; }
    .qsc-level-handle.sort-handle { width: 78px; height: 32px; margin: 2px 5px 0px 5px; line-height: 33px; color: #000000; background-color: #ffffff; }
    .qsc-button.dup { background-color: #0000ff; background-image: url("../../../asset/duplicate-icon.png"); }
    .qsc-button.del { background-color: #cccccc; background-image: url("../../../asset/delete-icon.png"); }
    .qsc-button.del.active { background-color: #ff0000; }
    .qsc-button.add { background-color: #00ff00; background-image: url("../../../asset/add-icon.png"); }
    .qsc-input-cont { width: calc(100% - 244px); margin: 7px 0px 0px 10px; }
        .qsc-input-cont > input { width: calc(100% - 10px); }

    .qsc-level-progress-area { width: 388px; height: 100%; padding: 0; }
      .qsc-level-retries { width: 118px; margin: 6px 0px 0px 0px; }
        .qsc-level-retries * { }
    .qsc-level-progress-holder { width: 182px; margin: 6px 12px 0px 0px; }
      .qsc-level-progress-label { margin: 0; }
      .qsc-level-progress-total { width: calc(100% - 58px); margin: 0; }
    .qsc-level-nav, .qsc-level-random { width: 32px; height: 32px; }
    .qsc-level-nav { margin: 13px 0px 0px 0px; background-color: #0000ff; background-image: url("../../../asset/nav-icon.svg"); }
    .qsc-level-random { margin: 13px 5px 0px 0px; background-color: #0000ff; background-image: url("../../../asset/random-icon.svg"); }
    .qsc-level-nav.active, .qsc-level-random.active { background-color: #00ff00; }

  */

</style>