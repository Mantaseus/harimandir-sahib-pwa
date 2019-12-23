<script>
    import {createEventDispatcher} from 'svelte';

    export let name = '';
    export let language = '';
    export let image = '';

    const dispatch = createEventDispatcher();

    function handleClick(e) {
        dispatch('stopClicked', {});
    }
</script>

<style>
    .container {
        background-color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 50;
        border-top: 1px solid #ddd;

        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;

        padding: 10px;
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

    .stop-button {
        width: 25px;
        height: 25px;
        background-color: black;
        margin-right: 10px;
    }
</style>

<div class="container">
    <img src={image} alt={name}/>
    <div class="name {language}">{name}</div>
    <div class="stop-button" on:click={handleClick}></div>
</div>
