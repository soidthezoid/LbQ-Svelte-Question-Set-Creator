<div class="relative float-left w-full mx-0 my-[3px]">
    <input type="checkbox" name={name} class="relative float-left w-[20px] h-[20px] mr-[4px]" bind:checked={checked} />
    <p class="relative float-left m-0 text-base leading-4">{label}</p>
</div>
    
<script lang="ts">

    export let name = "";
    export let label = "";
    export let checked = false;

</script>