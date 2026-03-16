import { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export function ScoreProvider({ children }) {
  const [score, setScore] = useState(null);

  const value = {
    score,
    setScore,
  };

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
}

export function useScoreContext() {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScoreContext must be used within ScoreProvider');
  }
  return context;
}
