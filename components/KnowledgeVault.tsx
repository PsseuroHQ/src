import React from 'react';

const KnowledgeVault = ({ vault, onReplay }) => (
  <div className="knowledge-vault">
    <h2>Knowledge Vault</h2>
    {vault.map((entry, idx) => (
      <div key={idx} className="vault-entry">
        <h4>{entry.name}</h4>
        <p>{entry.explanation}</p>
        <pre>{entry.code}</pre>
        <button onClick={() => onReplay(entry.scene)}>Replay Scene</button>
      </div>
    ))}
  </div>
);

export default KnowledgeVault;
