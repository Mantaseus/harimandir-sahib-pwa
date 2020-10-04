<script>
    import SimpleStream from './SimpleStream.svelte';
    import RaisedButton from './RaisedButton.svelte';
    import NowPlayingControl from './NowPlayingControl.svelte';
    import Navigation from './Navigation.svelte';

    let nowPlaying = {};
    let currentPage = 'main';

    $: nowPlayingData = streams.filter((el) => el.name === nowPlaying.name)[0];

    // This is used to hide the main page but prevent the stream elements from being removed
    // allowing the stream to keep running
    $: mainPageHideClass = currentPage === 'main' ? '' : 'hidden';

    const streams = [
        {
            name: 'lwev suxo',
            language: 'punjabi',
            getUrl: () => {
                return 'http://sgpc.net:8000/;'
            }
        },
        {
            name: 'hukmnwmw suxo',
            language: 'punjabi',
            getUrl: () => {
                const today = new Date();
                const day = today.getDate();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();

                // The date string needs to be '250619' for 25th of June 2019
                const dayString = day.toString().padStart(2,'0');
                const monthString = month.toString().padStart(2,'0');
                const yearString = year.toString().slice(-2);

                const streamLink = `http://old.sgpc.net/audio/SGPCNET${dayString}${monthString}${yearString}.mp3`;
                return streamLink;
            }
        },
        {
            name: 'kQw suxo',
            language: 'punjabi',
            getUrl: () => {
                const today = new Date();
                const day = today.getDate();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();

                // The date string needs to be '250619' for 25th of June 2019
                const dayString = day.toString().padStart(2,'0');
                const monthString = month.toString().padStart(2,'0');
                const yearString = year.toString().slice(-2);

                const streamLink = `http://old.sgpc.net/katha/katha${dayString}${monthString}${yearString}.mp3`;
                return streamLink;
            }
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

    function showHukamnama(event) {
        currentPage = 'hukamnama';
    }

    function handleBackClicked(event) {
        currentPage = 'main';
    }
</script>

<style lang="scss">
    .page-title {
        font-family: Amrlipi;
        padding-bottom: 16px;
        font-size: 2em;

        display: flex;
        flex-direction: row;
        align-items: center;

        img {
            width: 80px;
            margin-right: 10px;
        }
    }

	.container {
        padding: 16px;
        padding-bottom: 86px;
        margin: 0 auto;
        max-width: 800px;

        &.hidden {
            display: none;
        }
	}

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

<main>
    <div class="container {mainPageHideClass}">
        <div class="page-title">
            <img src="/icons/icon_144.png" alt=""/>
            <div>hrmMidr swihb</div>
        </div>

        {#each streams as stream (stream.name)}
            <SimpleStream {...stream} on:startedPlaying={handleStartedPlaying}/>
        {/each}

        <RaisedButton text="hukmnwmw pVHo" language="punjabi" on:click={showHukamnama} />
    </div>

    {#if currentPage === 'hukamnama'}
        <Navigation name="hukmnwmw" language="punjabi" on:backClicked={handleBackClicked}/>
        <div class="container">
            hukamnama
        </div>
    {/if}

    {#if nowPlaying.name}
        <NowPlayingControl on:stopClicked={handleStop} {...nowPlayingData}/>
    {/if}
</main>
