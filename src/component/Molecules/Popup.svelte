
<div class="ldl-ui-popup-blocker absolute top-0 left-0 w-full h-full bg-black opacity-70 z-[1]" tabindex="0"></div>

<div class="ldl-ui-popup absolute text-base text-center bg-white z-[100]" bind:this={popup} tabindex="0">
    <div class="ldl-ui-popup-header h-[40px] bg-blue-900">
        <p class="ldl-ui-popup-header-text text-white">{data.header}</p>
        <Button on:click={close} class="ldl-ui-popup-close !absolute !w-[40px] !h-[40px] top-0 right-0 bg-red-500 before:absolute before:content-[''] before:w-[5px] before:h-[28px] before:top-[6px] before:left-[17px] before:bg-white before:rounded-sm before:rotate-45 after:absolute after:content-[''] after:w-[5px] after:h-[28px] after:top-[6px] after:left-[17px] after:bg-white after:rounded-sm after:-rotate-45" />
    </div>
    <div class="ldl-ui-popup-content relative w-full h-[calc(100%-100px)] min-h-[40px] overflow-hidden">
        <p class="ldl-ui-popup-message w-[calc(100%-20px] m-[10px]">{data.message}</p>
        <p class="ldl-ui-popup-small-info w-[calc(100%-20px] m-[10px] text-zinc-600 text-sm italic">{data.smallInfo}</p>
    </div>
    <div class="ldl-ui-popup-button-holder relative w-[calc(100%-10px)] h-[40px] p-[5px]">
        {#each data.buttons as b, i}
            <Button backgroundClass={i < data.buttons.length - 1 ? "bg-lime-500" : "bg-red-500"} class="!w-auto !h-auto text-white mr-[5px] min-w-[25%] min-h-[40px] m-auto px-[6px] leading-[40px] inline-block" on:click={() => { onButtonClick(b); }}>
                <p class="ldl-ui-popup-button-text w-full h-full">{b.label}</p>
            </Button>
        {/each}
    </div>
</div>


<script lang="ts">

    export let data: IPopupData;

    import { onMount, createEventDispatcher } from "svelte";
    import type { IPopupData } from "../../interfaces/IPopupData";
    import type { IPopupButton } from "../../interfaces/IPopupButton";
    import Button from "../Atoms/Button.svelte";

    const dispatch = createEventDispatcher();

    let popup: HTMLDivElement;
    
    onMount( () => {
        if (data.width.slice(-2) !== "px" && data.height.slice(-2) !== "px") { throw(new Error("You must specify the Popup component's dimensions in units of px")); }
        popup.style.width = data.width;
        popup.style.height = data.height;
        popup.style.top = "calc(50% - " + String(parseInt(data.height)/2) + "px)";
        popup.style.left = "calc(50% - " + String(parseInt(data.width)/2) + "px)";
    })

    function onButtonClick(button: IPopupButton): void {
        if (button.callback) { button.callback(); } close();
    }
    
    function close(): void {
        dispatch("close");
    }

</script>