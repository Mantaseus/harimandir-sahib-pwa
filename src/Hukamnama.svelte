<script>
    import {onMount} from 'svelte';
    import _ from 'lodash';

    export let date = new Date();

    let hukamnama = {};

    onMount(async () => {
        hukamnama = await getHukamnama();
    })

    async function getHukamnama() {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return fetch(`/api/hukamnama?day=${day}&month=${month}&year=${year}`, {
            method: 'GET',
        }).then(res => res.json())
    }
</script>

<style lang="scss">
    div, h3 {
        font-size: 1.2em;
        @media screen and (max-width: 839px) {
            font-size: 1.75em;
            padding: 0 0.5em;
        }
    }
    .punjabi {
        font-family: "AmrLipi";
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
</style>

{#if !_.isEmpty(hukamnama)}
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