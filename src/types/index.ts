export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  isError?: boolean;
}

export type ChatType = 'mental-health' | 'QuranGPT';
