// Developer: John@psseuro.com | Date: 2025-10-24
// V0.1Description: Main component for the CodeQuest educational coding game
//V0.2: Enhanced CodeQuest component with Tailwind layout, achievement animation, and celebration overlay

import React, { useState } from 'react';
import { loadScenes, getScene, validateScene } from './utils/helper';
import ProgressMap from './components/ProgressMap';
import KnowledgeVault from './components/KnowledgeVault';
import AvatarCustomizer from './components/AvatarCustomizer';
import ConceptQuiz from './components/ConceptQuiz';
// import Confetti from 'react-confetti'; // Uncomment if using confetti
// import { playSound } from './utils/sound'; // Add your sound utility if available

const CodeQuest = () => {
  const scenes = loadScenes();

  const [currentPath, setCurrentPath] = useState<'forest' | 'space' | 'underwater' | null>(null);
  const [currentSceneId, setCurrentSceneId] = useState<string>('intro');
  const [showVault, setShowVault] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [avatar, setAvatar] = useState('?????');
  const [unlockedAvatars, setUnlockedAvatars] = useState(['?????']);
  const [knowledgeVault, setKnowledgeVault] = useState<any[]>([]);
  const [progressMap, setProgressMap] = useState({
    forest: { scenes: [], npcs: [] },
    space: { scenes: [], npcs: [] },
    underwater: { scenes: [], npcs: [] }
  });
  const [score, setScore] = useState(0);
  const [gameAchievements, setGameAchievements] = useState<string[]>([]);

  const btn = "px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition";

  const advanceScene = (nextId: string) => {
    if (currentPath) {
      const scene = getScene(currentPath, nextId);
      if (validateScene(scene)) {
        setCurrentSceneId(nextId);
        logSceneProgress(currentPath, nextId);
        if (scene.concept) addToVault(scene.concept, nextId);

        if (scene.reward) {
          setScore(prev => prev + (scene.reward.points || 0));
          if (scene.reward.achievement && !gameAchievements.includes(scene.reward.achievement)) {
            setGameAchievements(prev => [...prev, scene.reward.achievement]);
            // playSound('achievement'); // Uncomment when sound utility is added
          }
        }
      } else {
        console.warn('Invalid scene:', nextId);
      }
    }
  };

  const logSceneProgress = (path: string, sceneId: string) => {
    setProgressMap(prev => {
      const updated = new Set(prev[path].scenes);
      updated.add(sceneId);
      return {
        ...prev,
        [path]: { ...prev[path], scenes: Array.from(updated) }
      };
    });
  };

  const addToVault = (concept: any, sceneId: string) => {
    setKnowledgeVault(prev => [
      ...prev,
      { name: concept.name, explanation: concept.explanation, code: concept.code, scene: sceneId }
    ]);
  };

  const renderScene = () => {
    if (!currentPath) return <div>Select a path to begin</div>;
    const scene = getScene(currentPath, currentSceneId);
    if (!validateScene(scene)) return <div>Scene not found or invalid.</div>;

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-indigo-700">{scene.title}</h2>
        <p className="text-lg">{scene.text}</p>
        <div className="text-4xl">{scene.image}</div>

        {scene.concept && (
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-semibold">{scene.concept.name}</h3>
            <p>{scene.concept.explanation}</p>
            <pre className="bg-white p-2 rounded border">{scene.concept.code}</pre>
          </div>
        )}

        {scene.reward?.achievement && (
          <div className="mt-6 text-center animate-bounce text-yellow-500 text-3xl font-bold">
            ?? Achievement Unlocked: {scene.reward.achievement}
          </div>
        )}

        <div className="flex flex-col space-y-2">
          {scene.choices.map((choice: any, idx: number) => (
            <button key={idx} className={btn} onClick={() => advanceScene(choice.next)}>
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800 relative">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">CodeQuest</h1>
        <div className="space-x-3">
          <button className={btn} onClick={() => setShowMap(!showMap)}>Progress Map</button>
          <button className={btn} onClick={() => setShowVault(!showVault)}>Knowledge Vault</button>
          <button className={btn} onClick={() => setShowAvatar(!showAvatar)}>Customize Avatar</button>
        </div>
      </header>

      {!currentPath && (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Select Your Adventure Path</h2>
          <div className="flex justify-center space-x-4">
            <button className={btn} onClick={() => setCurrentPath('forest')}>?? Forest</button>
            <button className={btn} onClick={() => setCurrentPath('space')}>?? Space</button>
            <button className={btn} onClick={() => setCurrentPath('underwater')}>?? Underwater</button>
          </div>
        </div>
      )}

      {currentPath && (
        <main className="mt-6 bg-white shadow-md rounded-lg p-6">
          {renderScene()}
        </main>
      )}

      <div className="mt-6 space-y-4">
        {showMap && <ProgressMap progress={progressMap} />}
        {showVault && <KnowledgeVault vault={knowledgeVault} onReplay={setCurrentSceneId} />}
        {showAvatar && (
          <AvatarCustomizer
            unlockedAvatars={unlockedAvatars}
            avatarOptions={{
              '?????': { name: 'Space Explorer', cost: 0 },
              '?????': { name: 'Code Wizard', cost: 50 },
              '??': { name: 'Bug Crusher', cost: 75 },
              '??': { name: 'Logic Bot', cost: 100 },
              '??': { name: 'Syntax Dragon', cost: 150 },
              '??': { name: 'Pixel Master', cost: 200 }
            }}
            onSelect={setAvatar}
          />
        )}
      </div>

      <footer className="mt-8 text-center">
        <p className="text-lg font-semibold">Score: {score}</p>
        <p className="text-sm text-gray-500">Achievements: {gameAchievements.join(', ')}</p>
      </footer>

      {currentSceneId === 'complete' && (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col items-center justify-center z-50">
          {/* <Confetti /> Uncomment if using react-confetti */}
          <h1 className="text-5xl font-bold mb-4 animate-pulse">?? Quest Complete!</h1>
          <p className="text-xl mb-6 text-center max-w-xl">You've mastered coding fundamentals and restored magic to the realm!</p>
          <button
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded hover:bg-gray-100 transition"
            onClick={() => {
              setCurrentPath(null);
              setCurrentSceneId('intro');
              setScore(0);
              setGameAchievements([]);
              setKnowledgeVault([]);
              setProgressMap({
                forest: { scenes: [], npcs: [] },
                space: { scenes: [], npcs: [] },
                underwater: { scenes: [], npcs: [] }
              });
            }}
          >
            Return to Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeQuest;
