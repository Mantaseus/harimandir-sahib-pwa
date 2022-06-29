<script>
  import {onMount} from 'svelte';
  import SimpleStream from './SimpleStream.svelte';
  import RaisedButton from './RaisedButton.svelte';
  import NowPlayingControl from './NowPlayingControl.svelte';
  import Navigation from './Navigation.svelte';
  import Hukamnama from './Hukamnama.svelte';

  let nowPlaying = {};
  let currentPage = 'main';

  $: nowPlayingData = streams.filter((el) => el.name === nowPlaying.name)[0];

  // This is used to hide the main page but prevent the stream elements from being removed
  // allowing the stream to keep running
  $: mainPageHideClass = currentPage === 'main' ? '' : 'hidden';

  window.onpopstate = (event) => {
    setPageFromLocationHash();
  }

  onMount(() => {
    setPageFromLocationHash();
  })

  const streams = [
    {
      name: 'lwev suxo',
      language: 'punjabi',
      getUrl: () => {
        return 'http://live16.sgpc.net:8000/;nocache=889869'
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

        const streamLink = `http://old.sgpc.net/oldkatha/katha${dayString}${monthString}${yearString}.mp3`;
        return streamLink;
      }
    },
  ]

  function setPageFromLocationHash() {
    switch(location.hash) {
      case '#hukamnama':
        currentPage = 'hukamnama';
        break;
      default:
        currentPage = 'main';
        break;
    }
  }

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
    history.pushState(null, null, '#hukamnama');
  }

  function handleBackClicked(event) {
    history.back();
  }
</script>

<style>
  .page-title {
  font-family: Amrlipi;
  padding-bottom: 16px;
  font-size: 2em;

  display: flex;
  flex-direction: row;
  align-items: center;
  }
  .page-title img {
  width: 80px;
  margin-right: 10px;
  }

	.container {
  padding: 16px;
  padding-bottom: 86px;
  margin: 0 auto;
  max-width: 800px;
	}
  .container.hidden {
  display: none;
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
      <Hukamnama/>
    </div>
  {/if}

  {#if nowPlaying.name}
    <NowPlayingControl on:stopClicked={handleStop} {...nowPlayingData}/>
  {/if}
</main>
