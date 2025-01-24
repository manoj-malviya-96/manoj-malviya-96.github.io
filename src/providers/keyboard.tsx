import React, { createContext, useContext, useEffect, useRef } from "react";

type ShortcutHandler = () => void;

interface KeyboardManagerContextType {
  addShortcut: (key: string, handler: ShortcutHandler) => void;
  removeShortcut: (key: string) => void;
}

const KeyboardManagerContext = createContext<
  KeyboardManagerContextType | undefined
>(undefined);

export const useKeyboardManager = (): KeyboardManagerContextType => {
  const context = useContext(KeyboardManagerContext);
  if (!context) {
    throw new Error(
      "useKeyboardManager must be used within a KeyboardManagerProvider",
    );
  }
  return context;
};

export const KeyboardShortcutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const shortcutsRef = useRef<Map<string, ShortcutHandler>>(new Map());

  const handleKeyDown = (event: KeyboardEvent) => {
    const handler = shortcutsRef.current.get(event.key);
    if (handler) {
      event.preventDefault();
      event.stopPropagation();
      handler();
    }
  };

  const addShortcut = (key: string, handler: ShortcutHandler) => {
    shortcutsRef.current.set(key, handler);
  };

  const removeShortcut = (key: string) => {
    shortcutsRef.current.delete(key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <KeyboardManagerContext.Provider value={{ addShortcut, removeShortcut }}>
      {children}
    </KeyboardManagerContext.Provider>
  );
};
export default KeyboardShortcutProvider;
