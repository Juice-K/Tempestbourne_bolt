import React from 'react';
import { Cloud, Users, BarChart3, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentView: 'form' | 'characters' | 'comparison';
  onViewChange: (view: 'form' | 'characters' | 'comparison') => void;
  onReset: () => void;
  hasCharacters: boolean;
}

export function Header({ currentView, onViewChange, onReset, hasCharacters }: HeaderProps) {
  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cloud className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white font-cinzel">Tempestbourne</h1>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('form')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                currentView === 'form' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Cloud className="w-4 h-4" />
              <span>Generate</span>
            </button>
            
            {hasCharacters && (
              <>
                <button
                  onClick={() => onViewChange('characters')}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    currentView === 'characters' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Characters</span>
                </button>
                
                <button
                  onClick={() => onViewChange('comparison')}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    currentView === 'comparison' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Compare</span>
                </button>
              </>
            )}
            
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-all duration-200 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}