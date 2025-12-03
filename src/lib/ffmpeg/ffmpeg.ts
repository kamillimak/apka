import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { FFmpegProcess } from './types';

let ffmpeg: FFmpeg | null = null;

const loadFFmpeg = async (): Promise<FFmpeg> => {
  if (ffmpeg) {
    return ffmpeg;
  }
  ffmpeg = new FFmpeg();
  await ffmpeg.load({
    coreURL: '/node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.js',
    wasmURL: '/node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.wasm',
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
