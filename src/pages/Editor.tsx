import React from 'react';
import Preview from '../components/preview/Preview';
import Sidebar from '../components/sidebar/Sidebar';
import Timeline from '../components/timeline/Timeline';

const Editor: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-full">
          <div className="flex-1 flex items-center justify-center">
            <Preview />
          </div>
          <div className="h-64 bg-gray-800 border-t-2 border-gray-700">
            <Timeline />
          </div>
        </div>
        <div className="w-96 bg-gray-800 border-l-2 border-gray-700">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Editor;
