export const ItemTypes = {
  CLIP: 'clip',
  TRANSITION: 'transition',
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

export interface Transition {
  id: string;
  type: 'cross-dissolve';
  duration: number;
  fromClipId: string;
  toClipId: string;
}
