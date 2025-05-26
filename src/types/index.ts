export type EventType = 'olay' | 'dogum' | 'olum' | 'tatil';

interface Gun {
  id: number;
  gun: number;
  ay: number;
}

export interface HistoricalEvent {
  id: number;
  gun_id: number;
  gun: number;
  ay: number;
  yil?: number;
  icerik: string;
  gun_relation?: Gun;
}

export interface DateSelection {
  day: number;
  month: number;
  allDates: boolean;
} 