export type Language = 'punjabi' | 'english';

export interface StreamData {
  name: string;
  language: Language;
  url?: string;
  getUrl?: () => string;
}
