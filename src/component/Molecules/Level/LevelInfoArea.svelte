<div class={`qsc-level-info-area relative float-left w-[calc(100%+20px)] h-[20px] -left-[10px] mt-[10px] px-[10px] ${data.questions.length === 0 ? "bg-red-800" : "bg-sky-700"} ${$$props.class}`}>
    <div class="qsc-level-info-area-info text-sm">{ levelInfo }</div>
</div>

<script lang="ts">
    
    import type { ILevel } from "../../../interfaces/ILevel";
    
    export let data: ILevel;
    export let levelInfo: string;
    
</script>