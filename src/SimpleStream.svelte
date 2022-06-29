<script>
    import { createEventDispatcher, tick } from 'svelte';

    const dispatch = createEventDispatcher();

    export let name = 'Stream';
    export let url = '';
    export let getUrl;
    export let language = '';

    let audioElement;
    let stopped = true;
    let src = ''

    $: containerExtraClass = stopped ? '' : 'clicked';

    async function handlePlay() {
        if (!stopped) return;

        console.log('Starting');

        if (url) {
            src = url;
        } else if (getUrl) {
            src = getUrl();
        }

        // Wait for UI update and ask the audioElement to load the stream and start playing
        await tick();
        audioElement.load();
        audioElement.play();

        dispatch('startedPlaying', {
            name: name,
            stop: handleStop
        });

        stopped = false;
    }

    async function handleStop() {
        console.log('Stopping');
        audioElement.pause();

        src = '';
        
        // Wait for UI reload and then load the audioElement again. When it tries to load an empty
        // audio element it will stop the whole stream from before
        await tick();
        audioElement.load();
        stopped = true;
    }
</script>

<style>
    .container {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        background-color: white;
        padding: 10px 20px;
        box-sizing: border-box;

        border: 1px solid #ddd;
        border-radius: 0.5em;
        border-bottom-width: 4px;

        margin-bottom:16px;
    }
    .container.clicked {
        border-bottom-width: 1px;
        margin-top: 3px;
    }

    .title {
        font-size: 1em;
    }

    .punjabi {
        font-family: "AmrLipi";
        font-size: 1.2em;
    }
    @media screen and (max-width: 839px) {
        .punjabi {
            font-size: 1.5em;
        }
    }
</style>

<div on:click={handlePlay} class="container {containerExtraClass}">
    <audio
        bind:this={audioElement}
        {src}
    ></audio>
    <div class="title {language}">{name}</div>
</div>
