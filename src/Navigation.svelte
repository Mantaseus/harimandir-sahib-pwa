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

<style lang="scss">
    .container {
        background-color: white;
        width: 100%;
        z-index: 50;
        border-bottom: 1px solid #ddd;

        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;

        padding: 10px;
        padding-left: 20px;
        height: 70px;

        position: sticky;
        top: 0;

        @media screen and (max-width: 839px) {
            font-size: 1.25em;
        }
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
        margin-right: 20px;
        font-size: 1.4em;
    }
</style>

<div class="container">
    <i class="material-icons icon" on:click={handleClick}>arrow_back</i>
    <div class="name {language}">{title}</div>
</div>
