import React, { useContext, useState } from 'react';
import { TimelineContext } from '../../context/TimelineContext';
import { SubtitlesContext } from '../../context/SubtitlesContext';

const Subtitles: React.FC = () => {
  const timelineContext = useContext(TimelineContext);
  const subtitlesContext = useContext(SubtitlesContext);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!timelineContext || !subtitlesContext) {
    throw new Error('Subtitles must be used within a TimelineProvider and SubtitlesProvider');
  }

  const { clips } = timelineContext;
  const { addSubtitles } = subtitlesContext;

  const handleGenerateSubtitles = () => {
    const firstVideo = clips.find(clip => clip.type === 'video');
    if (firstVideo) {
      setIsGenerating(true);
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'pl-PL';
      recognition.continuous = true;
      recognition.interimResults = true;

      const audioContext = new AudioContext();
      fetch(firstVideo.url)
        .then(response => response.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(audioBuffer => {
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          const destination = audioContext.createMediaStreamDestination();
          source.connect(destination);
          const mediaStream = destination.stream;
          const mediaStreamTrack = mediaStream.getAudioTracks()[0];
          const mediaStreamSource = audioContext.createMediaStreamSource(new MediaStream([mediaStreamTrack]));
          
          recognition.onresult = (event) => {
            const newSubtitles = Array.from(event.results).map((result, index) => ({
              id: `sub-${index}`,
              text: result[0].transcript,
              startTime: result[0].timestamp ? result[0].timestamp / 1000 : 0,
              endTime: result[0].timestamp ? result[0].timestamp / 1000 + 2 : 2, // Dummy endTime
            }));
            addSubtitles(newSubtitles);
          };

          recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsGenerating(false);
          };

          recognition.onend = () => {
            setIsGenerating(false);
          };
          
          source.start();
          recognition.start();
        });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Subtitles</h3>
      <button
        onClick={handleGenerateSubtitles}
        disabled={isGenerating}
        className="w-full bg-neon-green text-gray-900 font-bold py-2 px-4 rounded disabled:bg-gray-500"
      >
        {isGenerating ? 'Generating...' : 'Generate Subtitles'}
      </button>
    </div>
  );
};

export default Subtitles;
