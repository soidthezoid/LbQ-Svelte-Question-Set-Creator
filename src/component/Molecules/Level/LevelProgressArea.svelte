<div class={`qsc-level-progress-area ${$$props.class}`}>
    <div class="qsc-level-retries qsc-retries float-left w-[100px]" title="Answer retries allowed for this level">
        <div class="float-left mr-[4px]">Retries: </div>
        <input class="float-left w-[40px] text-black" type="number" min="0" max="99" bind:value={data.retries} />
    </div>
    <Button class="qsc-level-nav float-right bg-nav" title="Enable to allow user to navigate freely between this level's questions" opacity={data.navigation ? "100" : "60"} on:click={onNavigationClick} />
    <Button class="qsc-level-random float-right bg-random" title="Enable to randomise the order in which this level's questions are delivered" opacity={data.random ? "100" : "60"} on:click={onRandomClick} />
    <div class="qsc-level-progress-holder float-right">
        <p class="qsc-level-progress-label">Progress <span class="qsc-level-after-label">after</span></p>
        <input type="number" class="qsc-level-progress-input text-black" title="Number of questions the user has to complete before being allowed to progress to the next level" min="1" max={data.questions.length} bind:value={data.progress} />
        <p class="qsc-level-progress-total">/ {data.questions.length}</p>
    </div>
</div>

<script lang="ts">

    import Button from "../../Atoms/Button.svelte";

    import type { ILevel } from "../../../interfaces/ILevel";

    export let data: ILevel;

    function onNavigationClick(): void {
        data.navigation = !data.navigation;
        if (data.navigation) { data.random = false; }
    }

    function onRandomClick(): void {
        data.random = !data.random;
        if (data.random) { data.navigation = false; }
    }

    /*export default {
        components: { Div, P, InputNumber },
        props: {
            data: { type: Object as PropType<ILevel>, default: { id: "00000000-0000-0000-0000-000000000000", level: 1, levelName: "Level 1", progress: 1, navigation: false, random: false, retries: 1, collapsed: false } }
        }

        // the "rest" of the component
    }*/

</script>


<style lang="scss">

     .qsc-level .qsc-retries { line-height: 35px; width: 96px; height: 30px; }
            .qsc-level .qsc-retries input { margin-top: 3px; width: 26px; }

        .qsc-level-progress-area { position: relative; float: left; width: 375px; height: 100%; }
            .qsc-level-progress-holder { position: relative; float: right; margin-right: 10px; background: rgba(255,255,255,0.1); padding: 0 9px; border-radius: 3px; }
                .qsc-level-progress-label { position: relative; float: left; margin: 0; line-height: 35px; margin-right: 5px; }
                .qsc-level-progress-input { position: relative; float: left; width: 35px; height: 24px; font-size: 17px; text-align: center; top: 3px; margin-right: 5px; }       
                .qsc-level-progress-total { position: relative; float: left; margin: 0; line-height: 35px; }

            .qsc-level-random { position: relative; top: 3px; width: 30px; height: 30px; float: right; background: url(../../../asset/random-icon.svg); background-size: contain; opacity: 0.6; cursor: pointer; }
            .qsc-level-nav { position: relative; top: 3px; width: 30px; height: 30px; float: right; margin-left: 10px; background: url(../../../asset/nav-icon.svg); background-size: contain; opacity: 0.6; cursor: pointer; }
                .qsc-level-nav.enabled, .qsc-level-random.enabled { opacity: 1; background-color: #8cc63f; border-radius: 4px; }

    @media only screen and (max-width: 730px) { 
        .qsc-level-progress-area { float: right; }
    }

    @media only screen and (max-width: 410px) { 
        .qsc-level-progress-area { width: 100%;}
        .qsc-level-progress-holder { margin-right: 3px;}
        .qsc-level-nav { margin-left: 3px;}
    }

    @media only screen and (max-width: 395px) { 
        .qsc-level-after-label { display: none;}
        .qsc-level-progress-holder { font-size: 14px;}
    }

</style>