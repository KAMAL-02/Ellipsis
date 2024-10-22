// Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 7px solid rgba(255, 255, 255);
          border-top: 5px solid #0670cc; /* Sky-400 */
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
