import forest from '../data/scenes/forest.json';
import space from '../data/scenes/space.json';
import underwater from '../data/scenes/underwater.json';

export const loadScenes = () => ({
  forest,
  space,
  underwater
});

export const getScene = (path: string, sceneId: string) => {
  const scenes = loadScenes();
  return scenes[path]?.[sceneId] || null;
};

export const validateScene = (scene: any): boolean => {
  if (!scene || typeof scene !== 'object') return false;
  return (
    typeof scene.title === 'string' &&
    typeof scene.text === 'string' &&
    Array.isArray(scene.choices)
  );
};

//Extend with localisation & analytics as needed
//localisation Hook (Stub)
export const localizeText = (text: string, lang: string = 'en') => {
  // Placeholder for future i18n integration
  return text;
};

//Scene Analytics Hook (Stub)
export const trackSceneVisit = (path: string, sceneId: string) => {
  console.log(`Visited: ${path}/${sceneId}`);
  // Extend with telemetry or localStorage tracking
};
