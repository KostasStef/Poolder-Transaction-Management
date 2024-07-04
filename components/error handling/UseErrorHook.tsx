import { useState, useEffect } from 'react';

export const useError = () => {
  const [error, setError] = useState<{ message: string, title?: string } | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const triggerError = (message: string, title?: string) => {
    setError({ message, title });
    setShowError(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showError]);

  return { error, showError, triggerError };
};