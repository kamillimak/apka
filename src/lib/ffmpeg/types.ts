export interface FFmpegProcess {
  (
    inputFile: File,
    outputFileName: string,
    opts: readonly string[],
  ): Promise<File>;
}
