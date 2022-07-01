<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  export let name = '';
  export let language = '';

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
    padding-left: 20px;
    height: 70px;

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

  .stop-button {
    width: 25px;
    height: 25px;
    background-color: black;
    margin-right: 10px;
  }
</style>

<div class="container">
  <div class="name {language}">{name}</div>
  <div class="stop-button" on:click={handleClick}></div>
</div>
