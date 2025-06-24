import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface AppRunState {
  isLoading: boolean;
  isNfcOn: boolean;
}

interface AppRunContextType extends AppRunState {
  setIsLoading: (value: boolean) => void;
  setIsNfcOn: (value: boolean) => void;
}

const AppRunContext = createContext<AppRunContextType | undefined>(undefined);

export const AppRunProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNfcOn, setIsNfcOn] = useState(false);

  return <AppRunContext.Provider value={{ isLoading, setIsLoading, isNfcOn, setIsNfcOn }}>{children}</AppRunContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useAppRun = (): AppRunContextType => {
  const context = useContext(AppRunContext);
  if (!context) {
    throw new Error('useAppRun must be used within an AppRunProvider');
  }
  return context;
};
