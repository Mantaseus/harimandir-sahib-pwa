<script>
    import SimpleStream from './SimpleStream.svelte';
    import NowPlayingControl from './NowPlayingControl.svelte';

    let nowPlaying = {};

    $: nowPlayingData = streams.filter((el) => el.name === nowPlaying.name)[0];

    const streams = [
        {
            name: 'lwev suxo',
            language: 'punjabi',
            url: 'http://sgpc.net/live-kirtan-sri-harmandir-sahib-96-kbps/',
        },
        {
            name: 'hukmnwmw suxo',
            language: 'punjabi',
            url: 'http://sgpc.net/mukhwak-audio-2/',
        },
        {
            name: 'kQw suxo',
            language: 'punjabi',
            url: 'http://sgpc.net/mukhwak-audio-2/',
        },
    ]

    function handleStartedPlaying(event) {
        handleStop();
        const playingStreamData = streams.filter((el) => el.name === event.detail.name);
        console.log(playingStreamData);
        nowPlaying = event.detail;
    }

    function handleStop(event) {
        if (nowPlaying.name) {
            nowPlaying.stop();
        }
        nowPlaying = {};
    }
</script>

<style>
    .page-title {
        font-family: Amrlipi;
        padding-bottom: 16px;
        font-size: 2em;
    }

	.list-container {
        padding: 16px;
        padding-bottom: 86px;
        margin: 0 auto;
        max-width: 800px;
	}

    main {
        display: flex;
    }
</style>

<main>
    <div class="list-container">
        <div class="page-title">
            hrmMidr swihb
        </div>

        {#each streams as stream (stream.name)}
            <SimpleStream {...stream} on:startedPlaying={handleStartedPlaying}/>
        {/each}
    </div>

    {#if nowPlaying.name}
        <NowPlayingControl on:stopClicked={handleStop} {...nowPlayingData}/>
    {/if}
</main>
