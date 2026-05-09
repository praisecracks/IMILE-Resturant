import { useState, useEffect, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Error caught by boundary:', event.error);
      setHasError(true);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-display text-gold mb-4">Something went wrong</h1>
          <p className="text-white/60 mb-6">The ìmọ́lẹ̀ experience encountered an unexpected error.</p>
          <button
            onClick={() => window.location.reload()}
            className="pill-btn"
          >
            Reload Experience
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}