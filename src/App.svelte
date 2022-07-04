<script lang="ts">
  import {onMount} from 'svelte';
  import SimpleStream, { Events as SimpleStreamEvents } from './lib/SimpleStream.svelte';
  import RaisedButton from './lib/RaisedButton.svelte';
  import NowPlayingControl from './lib/NowPlayingControl.svelte';
  import Navigation from './lib/Navigation.svelte';
  import Hukamnama from './lib/Hukamnama.svelte';
  import { streams } from './urls';

  let nowPlaying: SimpleStreamEvents['startedPlaying'] | null = null;
  let currentPage = 'main';

  $: nowPlayingData = streams.filter((el) => el.name === nowPlaying?.name)[0];

  // This is used to hide the main page but prevent the stream elements from being removed
  // allowing the stream to keep running
  $: mainPageHideClass = currentPage === 'main' ? '' : 'hidden';

  window.onpopstate = () => {
    setPageFromLocationHash();
  }

  onMount(() => {
    setPageFromLocationHash();
  })

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

  function handleStartedPlaying(event: CustomEvent<SimpleStreamEvents['startedPlaying']>) {
    handleStop();
    const playingStreamData = streams.filter((el) => el.name === event.detail.name);
    console.log(playingStreamData);
    nowPlaying = event.detail;
  }

  function handleStop() {
    if (nowPlaying?.name) {
      nowPlaying?.stop?.();
    }
    nowPlaying = null;
  }

  function showHukamnama() {
    currentPage = 'hukamnama';
    history.pushState(undefined, '', '#hukamnama');
  }

  function handleBackClicked() {
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

  {#if nowPlaying?.name}
    <NowPlayingControl on:stopClicked={handleStop} {...nowPlayingData}/>
  {/if}
</main>
