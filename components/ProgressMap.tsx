import React from 'react';

const ProgressMap = ({ progress }) => (
  <div className="progress-map">
    {Object.entries(progress).map(([path, data]) => (
      <div key={path}>
        <h3>{path.toUpperCase()}</h3>
        <p>Scenes completed: {data.scenes.length}</p>
        <p>NPCs met: {data.npcs.join(', ') || 'None'}</p>
      </div>
    ))}
  </div>
);

export default ProgressMap;
