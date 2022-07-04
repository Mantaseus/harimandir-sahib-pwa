import type { StreamData } from "./types";

export function getHukamnamaUrl(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `/raw_hukamnamas/${year}${month}${day}.html`;
}

export const streams: StreamData[] = [
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
];
