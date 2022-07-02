<script lang="ts">
  import type { Language } from "../types";

  export let text = '<placeholder>';
  export let language: Language = 'english';
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
  .container:focus {
    border-bottom-width: 1px;
    margin-top: 3px;
  }
  @media screen and (max-width: 839px) {
    .container {
      font-size: 1.25em;
    }
  }

  .punjabi {
    font-size: 1.2em;

  }
  @media screen and (max-width: 839px) {
    .punjabi {
      font-size: 1.5em;
    }
  }
</style>

<div on:click class="container {language}">
  {text}
</div>
