<script lang="ts">
  import isEmpty from 'lodash/isEmpty';
  import { getHukamnamaUrl } from '../urls';

  export let date = new Date();

  let hukamnamaPromise = getHukamnama();

  async function getHukamnama() {
    return fetch(getHukamnamaUrl(date), { method: 'GET' })
      .then(res => res.text())
      .then(text => new DOMParser().parseFromString(text, 'text/html'))
      .then(res => { console.log({ textAsHTML: res }); return res; })
      .then(html => parseMukhvaak(html))
      .then(res => { console.log({ parsedHukamnama: res }); return res; });
  }

  function textOfElements(html: Document, selector: string) {
    return Array.from<HTMLElement>(html.querySelectorAll(selector)).map(el => el.innerText.trim());
  }

  function parseMukhvaak(html: Document){
    const [ punjabiDate, punjabiPage, englishDate, englishPage ] = textOfElements(html, 'center > div > table font');
    return {
      mukhvaak: {
        titles: textOfElements(html, 'center > center td font > font'),
        body: textOfElements(html, 'center > center p'),
      },
      punjabiTranslation: {
        titles: textOfElements(html, 'center > div > center table:nth-of-type(1) font'),
        body: textOfElements(html, 'center > div > center p:nth-of-type(1)'),
      },
      englishTranslation: {
        titles: textOfElements(html, 'center > div > center table:nth-of-type(2) div[align="center"] font'),
        body: textOfElements(html, 'center > div > center p:nth-of-type(2)'),
      },
      date: {
        punjabi: punjabiDate,
        english: englishDate,
      },
      page: {
        punjabi: punjabiPage,
        english: englishPage
      },
    };
  }
</script>

<style>
  div, h3 {
      font-size: 1.2em;
  }
  @media screen and (max-width: 839px) {
    div, h3 {
      font-size: 1.75em;
      padding: 0 0.5em;
    }
  }

  .centered {
    text-align: center;
  }
  .justified {
    text-align: justify;
  }

  .separator {
    color: #5d5400;
    background-color: #e2cc00;
    width: 100%;
    border-radius: 1em;
    box-sizing: border-box;
    margin: 1em 0 0.5em 0;
    padding: 0.1em 0
  }

  @keyframes loader-anim {
    0% {color: #5d5400;}
    100% {color: #e2cc00;}
  }
  .loader {
    font-size: 2.5em;
    margin: 3em 0 1em 0;
    animation: 1s ease-in-out infinite loader-anim alternate;
  }

  .error-container {
    background-color: rgba(255, 218, 218);
    color: rgb(175, 66, 66);
    border: 1px solid rgb(175, 66, 66);
    border-radius: 0.5em;
    padding: 1em;
    max-width: 25em;
  }
  .error-container .title {
    font-weight: bold;
    margin-bottom: 1em;
  }
</style>

{#await hukamnamaPromise}
  <div class="centered punjabi loader">Ç</div>
  <div class="centered punjabi">lof ho irhw hY</div>
{:then hukamnama}
  {#if !isEmpty(hukamnama)}
    {#each hukamnama.mukhvaak.titles as title}
      <h3 class="centered punjabi">{title}</h3>
    {/each}
    <div class="justified punjabi">{hukamnama.mukhvaak.body}</div>

    <div class="punjabi centered separator">ArQ</div>
    {#each hukamnama.punjabiTranslation.titles as title}
      <h3 class="centered punjabi">{title}</h3>
    {/each}
    <div class="justified punjabi">{hukamnama.punjabiTranslation.body}</div>

    <div class="centered separator">Translation</div>
    {#each hukamnama.englishTranslation.titles as title}
      <h3 class="centered">{title}</h3>
    {/each}
    <div class="justified">{hukamnama.englishTranslation.body}</div>
  {/if}
{:catch error}
  <div class="error-container">
    <div class="title">Error while loading (TODO: Punjabi)</div>
    <div>{String(error)}</div>
  </div>
{/await}
