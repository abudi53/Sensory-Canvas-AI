"use client";

import React, { createContext, useCallback, useState } from "react";

interface SoundControlContextType {
  registerSound: (stop: () => void) => void;
  unregisterSound: (stop: () => void) => void;
  stopAllSounds: () => void;
}

const SoundControlContext = createContext<SoundControlContextType>({
  registerSound: () => {},
  unregisterSound: () => {},
  stopAllSounds: () => {},
});

export const SoundControlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [soundStops, setSoundStops] = useState<(() => void)[]>([]);

  const registerSound = useCallback((stop: () => void) => {
    setSoundStops((prev) => [...prev, stop]);
  }, []);

  const unregisterSound = useCallback((stop: () => void) => {
    setSoundStops((prev) => prev.filter((fn) => fn !== stop));
  }, []);

  const stopAllSounds = useCallback(() => {
    soundStops.forEach((stopFn) => stopFn());
    // Don't clear the array - just stop the sounds
  }, [soundStops]);

  return (
    <SoundControlContext.Provider
      value={{ registerSound, unregisterSound, stopAllSounds }}
    >
      {children}
    </SoundControlContext.Provider>
  );
};

export default SoundControlContext;
