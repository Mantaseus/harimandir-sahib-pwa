<script>
    import {createEventDispatcher, onMount} from 'svelte';

    export let name = '';
    export let language = '';
    export let today = new Date();

    $: day = today.getDate();
    $: month = today.getMonth() + 1;
    $: year = today.getFullYear();
    $: title = `${name}: ${day}.${month}.${year}`

    const dispatch = createEventDispatcher();

    onMount(() => {
        today = new Date();
    });

    function handleClick(e) {
        dispatch('backClicked', {});
    }
</script>

<style>
    .container {
        background-color: white;
        width: 100%;
        z-index: 50;
        border-top: 1px solid #ddd;

        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;

        padding: 10px;
        padding-left: 20px;
        height: 70px;
    }

    .name {
        flex: 1;
    }

    .punjabi {
        font-family: "AmrLipi";
        font-size: 1.2em;
    } 
    img {
        height: 100%;
        object-fit: contain;
        display: inline-block;
        margin-right: 20px;
        width: 50px;
        height: 50px;
    }

    .icon {
        width: 25px;
        height: 25px;
        background-color: black;
        margin-right: 20px;
    }
</style>

<div class="container">
    <div class="icon" on:click={handleClick}></div>
    <div class="name {language}">{title}</div>
</div>
