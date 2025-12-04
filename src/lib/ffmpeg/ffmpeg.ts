import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { FFmpegProcess } from './types';

let ffmpeg: FFmpeg | null = null;

const CORE_URL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js';
const WASM_URL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm';


const loadFFmpeg = async (): Promise<FFmpeg> => {
  if (ffmpeg && ffmpeg.loaded) {
    return ffmpeg;
  }
  ffmpeg = new FFmpeg();
  await ffmpeg.load({
    coreURL: CORE_URL,
    wasmURL: WASM_URL,
  });
  return ffmpeg;
};

export const processVideo: FFmpegProcess = async (
  inputFile: File,
  outputFileName: string,
  opts: readonly string[],
): Promise<File> => {
  const ffmpeg = await loadFFmpeg();
  await ffmpeg.writeFile(inputFile.name, await fetchFile(inputFile));
  await ffmpeg.exec(['-i', inputFile.name, ...opts, outputFileName]);
  const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;
  return new File([data.buffer as ArrayBuffer], outputFileName);
};
