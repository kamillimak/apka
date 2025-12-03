import React, { useContext, useState } from 'react';
import { TimelineContext } from '../../context/TimelineContext';
import { processVideo } from '../../lib/ffmpeg/ffmpeg';

const Export: React.FC = () => {
  const timelineContext = useContext(TimelineContext);
  const [isExporting, setIsExporting] = useState(false);

  if (!timelineContext) {
    throw new Error('Export must be used within a TimelineProvider');
  }

  const { clips } = timelineContext;

  const handleExport = async () => {
    const firstVideo = clips.find(clip => clip.type === 'video');
    if (firstVideo) {
      setIsExporting(true);
      try {
        const inputFile = await (await fetch(firstVideo.url)).blob();
        const outputFile = await processVideo(
          new File([inputFile], firstVideo.name),
          'output.mp4',
          ['-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '22'],
        );
        const a = document.createElement('a');
        a.href = URL.createObjectURL(outputFile);
        a.download = 'output.mp4';
        a.click();
      } catch (error) {
        console.error('Error exporting video:', error);
      } finally {
        setIsExporting(false);
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Export</h3>
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full bg-neon-green text-gray-900 font-bold py-2 px-4 rounded disabled:bg-gray-500"
      >
        {isExporting ? 'Exporting...' : 'Export Video'}
      </button>
    </div>
  );
};

export default Export;
