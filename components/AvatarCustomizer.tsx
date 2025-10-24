import React from 'react';

const AvatarCustomizer = ({ unlockedAvatars, avatarOptions, onSelect }) => (
  <div className="avatar-customizer">
    <h2>Choose Your Avatar</h2>
    {Object.entries(avatarOptions).map(([icon, meta]) => (
      unlockedAvatars.includes(icon) && (
        <button key={icon} onClick={() => onSelect(icon)}>
          {icon} - {meta.name}
        </button>
      )
    ))}
  </div>
);

export default AvatarCustomizer;
