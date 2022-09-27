<div class="qsc-question-typeselect float-left w-[130px] h-[65px]" title="Select question type">

    <p class="qsc-question-typeselect-header w-full h-[calc(50%-5px)] m-0 mb-[5px] leading-8">Answer Type</p>

    <select class="qsc-question-typeselect-dropdown w-full h-1/2 text-zinc-400 font-bold text-sm text-center" bind:value on:change>
        <option data-type="Text" value="Text">Text</option>
        <option data-type="Numeric" value="Numeric">Numeric</option>
        <option data-type="Yes/No" value="YesNo">Yes/No</option>
        <option data-type="True/False" value="TrueFalse">True/False</option>
        <!--option data-type="Multiple Choice" value="MultipleChoice">Multiple Choice</option>
        <option data-type="Sort" value="Sort">Sort</option-->
    </select>
    
</div>

<script lang="ts">

    export let value: string;

</script>