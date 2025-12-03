import React, { useContext, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { MediaContext } from '../../context/MediaContext';
import { ItemTypes } from '../../types/types';

const DraggableMediaFile = ({ file }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CLIP,
    item: { id: file.id, name: file.name, url: file.url, type: file.type, duration: file.duration },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-gray-700 p-2 rounded cursor-move"
    >
      <p className="text-sm truncate">{file.name}</p>
    </div>
  );
};

const MediaPool: React.FC = () => {
  const context = useContext(MediaContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!context) {
    throw new Error('MediaPool must be used within a MediaProvider');
  }

  const { mediaFiles, addMediaFile } = context;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(file => {
        addMediaFile(file);
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Media Pool</h3>
      <button
        onClick={handleUploadClick}
        className="w-full bg-neon-green text-gray-900 font-bold py-2 px-4 rounded mb-4 hover:bg-green-400"
      >
        Upload Media
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="video/mp4,video/quicktime,audio/mpeg"
        className="hidden"
      />
      <div className="space-y-2">
        {mediaFiles.map(file => (
          <DraggableMediaFile key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default MediaPool;
