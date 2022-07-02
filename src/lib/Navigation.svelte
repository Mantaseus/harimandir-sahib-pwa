<script lang="ts">
  import {createEventDispatcher, onMount} from 'svelte';

  import type { Language } from '../types';

  export let name = '';
  export let language: Language = 'english';
  export let today = new Date();

  $: day = today.getDate();
  $: month = today.getMonth() + 1;
  $: year = today.getFullYear();
  $: title = `${name}: ${day}.${month}.${year}`

  const dispatch = createEventDispatcher();

  onMount(() => {
    today = new Date();
  });

  function handleClick() {
    dispatch('backClicked', {});
  }
</script>

<style>
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
  }
  @media screen and (max-width: 839px) {
    .container {
      font-size: 1.25em;
    }
  }

  .name {
    flex: 1;
  }

  .punjabi {
    font-size: 1.2em;
  } 

  .icon {
    width: 25px;
    height: 25px;
    margin-right: 20px;
    font-size: 1.4em;
    cursor: pointer;
  }
</style>

<div class="container">
  <i class="material-icons icon" on:click={handleClick}>arrow_back</i>
  <div class="name {language}">{title}</div>
</div>
