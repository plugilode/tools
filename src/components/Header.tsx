import { useState } from 'react';

const Header = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="p-4 border-b">
      <div className="container mx-auto flex items-center">
        {!imageError ? (
          <img 
            src="/og-image.svg" 
            alt="Logo" 
            className="h-12 w-auto" 
            onError={() => {
              console.error('Failed to load logo');
              setImageError(true);
            }}
          />
        ) : (
          <span>Logo failed to load</span>
        )}
      </div>
    </header>
  );
};

export default Header; 