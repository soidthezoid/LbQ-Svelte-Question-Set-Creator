<div title={title} class="qsc-question-supplement relative float-left w-[80px] h-[65px] mt-0 mr-[10px] mb-[6px] ml-0 text-black bg-white outline outline-1 outline-zinc-400 font-sans overflow-hidden cursor-pointer">

    <div class="qsc-question-supplement-text absolute top-[20px] w-full h-full font-sm hidden">text</div>
    <div class="qsc-question-supplement-image w-full h-full bg-white bg-camera-img bg-no-repeat bg-center bg-contain"></div>

    <Button title="Preview this question supplement" class="!absolute !w-[20px] !h-[20px] float-left left-0 top-0 mb-1 leading-8 bg-lime-500 bg-no-repeat bg-contain bg-preview" />
    <Button title="Delete this question supplement" class="!absolute !w-[20px] !h-[20px] float-left right-0 top-0 mb-1 leading-8 bg-red-600 after:absolute after:content-[''] after:w-[10px] after:h-[4px] after:top-[calc(50%-2.5px)] after:left-[calc(50%-5px)] after:m-0 after:bg-white" />
   
</div>

<script lang="ts">

    import Button from "../../Atoms/Button.svelte";

    export let title = "No supplement assigned";

</script>