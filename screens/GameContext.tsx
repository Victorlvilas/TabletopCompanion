import { createContext, useContext, useState } from 'react';

type GameContextType = {
  jugadores: string[];
  setJugadores: (j: string[]) => void;
  puntuaciones: (number | null)[][];
  setPuntuaciones: (p: (number | null)[][]) => void;
  rondaActual: number;
  setRondaActual: (r: number) => void;
  makiPorRonda: number[][];
  setMakiPorRonda: (m: number[][]) => void;
  pudinTotal: number[];
  setPudinTotal: (p: number[]) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [jugadores, setJugadores] = useState<string[]>([]);
  const [puntuaciones, setPuntuaciones] = useState<(number | null)[][]>([]);
  const [rondaActual, setRondaActual] = useState(1);
  const [makiPorRonda, setMakiPorRonda] = useState<number[][]>([]);
  const [pudinTotal, setPudinTotal] = useState<number[]>([]);

  return (
    <GameContext.Provider value={{
      jugadores, setJugadores,
      puntuaciones, setPuntuaciones,
      rondaActual, setRondaActual,
      makiPorRonda, setMakiPorRonda,
      pudinTotal, setPudinTotal,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame debe usarse dentro de GameProvider');
  return context;
}