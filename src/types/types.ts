export const ItemTypes = {
  CLIP: 'clip',
};

export interface Clip {
  id: string;
  name: string;
  url: string;
  type: 'video' | 'audio';
  startTime: number;
  endTime: number;
  duration: number;
}
