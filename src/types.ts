export interface CaptionItem {
  id: number;
  title: string;
  theme: string;
  hook: string;
  text: string;
  emojis: string[];
  hashtags: string[];
  points: {
    murah: string;
    kualitasBagus: string;
    ramahLingkungan: string;
  };
  sampleImage: string;
}
