import React from 'react';
import vignansLogo from '../assets/images.png'; // Local logo import

/**
 * A sleek, glassmorphic navigation bar featuring only a logo.
 * It has a frosted glass effect and a subtle shadow.
 * This component assumes Tailwind CSS is available in your project.
 */
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-xl bg-white bg-opacity-10 px-6 py-3 shadow-lg backdrop-blur-md backdrop-filter">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <img 
            src={vignansLogo} 
            alt="Vignan's Institute of Information Technology" 
            className="h-10 sm:h-12" // Adjust height as needed
          />
        </div>
        
        {/* No navigation links in this version */}
      </div>
    </nav>
  );
}
