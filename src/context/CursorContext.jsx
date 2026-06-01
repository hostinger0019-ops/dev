import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({
  hovered: false,
  label: '',
  setCursorHovered: () => {},
  setCursorLabel: () => {},
});

export function CursorProvider({ children }) {
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');

  const setCursorHovered = useCallback((val) => setHovered(val), []);
  const setCursorLabel = useCallback((val) => setLabel(val), []);

  return (
    <CursorContext.Provider value={{ hovered, label, setCursorHovered, setCursorLabel }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
