
import React from 'react';

const StagesProgressBar: React.FC = () => {
  return (
    <div className="hidden sm:block absolute left-0 right-0 h-1 bg-muted top-9 transform translate-y-1/2">
      <div className="absolute left-0 h-full bg-primary w-0"></div>
    </div>
  );
};

export default StagesProgressBar;
