import React from 'react';
import MediaPool from './MediaPool';
import Export from '../export/Export';

const Sidebar: React.FC = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-neon-green mb-4">Edit</h2>
        <MediaPool />
      </div>
      <Export />
    </div>
  );
};

export default Sidebar;
