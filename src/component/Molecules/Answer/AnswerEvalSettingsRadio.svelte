<input type="radio" name={name} class="relative float-left w-[20px] h-[20px] mr-[4px] mb-1 clear-both" bind:group={bindGroup} value={value} />
<p class="relative float-left m-0 text-base leading-4">{label}</p>

<script lang="ts">

    export let name = "";
    export let bindGroup;
    export let value;
    export let label;

</script>