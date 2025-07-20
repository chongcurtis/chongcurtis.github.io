import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CrystalViewer } from '@/components/materials/CrystalViewer';
import { CustomSlider } from '@/components/materials/CustomSlider';
import { MantineProvider } from '@mantine/core';
import { ScatterChart, BarChart } from '@mantine/charts';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';


interface Material {
  material_id: string;
  formation_energy_per_atom: number;
  band_gap: number;
  pretty_formula: string;
  e_above_hull: number;
  lattice_parameters: {
    a: number;
    b: number;
    c: number;
    alpha: number;
    beta: number;
    gamma: number;
  };
  atomic_numbers: number[];
  atomic_positions: number[][];
}

interface GuessHistory {
  materialIndex: number;
  materialId: string;
  formula: string;
  guessValue: number;
  actualValue: number;
  error: number;
  timestamp: Date;
}

interface Props {
  materials: Material[];
}

const STORAGE_KEY = 'mp20-guesser-history';
const CURRENT_INDEX_KEY = 'mp20-guesser-current-index';

export default function MP20Guesser({ materials }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState(-2.0); // Default slider value
  const [guessHistory, setGuessHistory] = useState<GuessHistory[]>([]);
  const [currentGuessResult, setCurrentGuessResult] = useState<{ guessValue: number; actualValue: number; error: number } | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isNewBestGuess, setIsNewBestGuess] = useState(false);
  
  // Get current material
  const currentMaterial = materials[currentIndex];

  // Load saved state from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load guess history
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          // Convert timestamp strings back to Date objects
          const historyWithDates = parsedHistory.map((guess: any) => ({
            ...guess,
            timestamp: new Date(guess.timestamp)
          }));
          setGuessHistory(historyWithDates);
        } catch (error) {
          console.error('Error parsing saved history:', error);
        }
      }

      // Load current index (only if no hash in URL)
      const hash = window.location.hash.slice(1);
      if (!hash) {
        const savedIndex = localStorage.getItem(CURRENT_INDEX_KEY);
        if (savedIndex) {
          try {
            const index = parseInt(savedIndex, 10);
            if (!isNaN(index) && index >= 0 && index < materials.length) {
              setCurrentIndex(index);
              // Update URL to reflect the saved position
              window.location.hash = (index + 1).toString();
            }
          } catch (error) {
            console.error('Error parsing saved index:', error);
          }
        }
      }
      
      setIsInitialized(true);
    }
  }, [materials.length]);

  // Save current index to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      localStorage.setItem(CURRENT_INDEX_KEY, currentIndex.toString());
    }
  }, [currentIndex, isInitialized]);

  // Save guess history to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && guessHistory.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guessHistory));
    }
  }, [guessHistory]);

  // Handle URL hash changes
  useEffect(() => {
    if (!isInitialized) return; // Don't process hash changes until initialized
    
    const updateIndexFromHash = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash && !isNaN(Number(hash))) {
        const urlIndex = Number(hash);
        const index = Math.max(0, Math.min(urlIndex - 1, materials.length - 1));
        setCurrentIndex(index);
        setGuess(-2.0);
      }
    };

    updateIndexFromHash();
    window.addEventListener('hashchange', updateIndexFromHash);
    return () => window.removeEventListener('hashchange', updateIndexFromHash);
  }, [materials.length, isInitialized]);

  // Update URL when index changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      window.location.hash = (currentIndex + 1).toString();
    }
  }, [currentIndex, isInitialized]);

  const handleGuess = () => {
    const guessValue = guess;
    if (isNaN(guessValue)) {
      alert('Please enter a valid number');
      return;
    }

    const actualValue = currentMaterial.formation_energy_per_atom;
    const calculatedError = Math.abs(guessValue - actualValue);
    
    // Check if this is a new best guess
    const currentBestError = guessHistory.length > 0 ? Math.min(...guessHistory.map(g => g.error)) : Infinity;
    const isNewBest = calculatedError < currentBestError;
    
    // Add to guess history
    const newGuess: GuessHistory = {
      materialIndex: currentIndex,
      materialId: currentMaterial.material_id,
      formula: currentMaterial.pretty_formula,
      guessValue,
      actualValue,
      error: calculatedError,
      timestamp: new Date()
    };
    
    setGuessHistory(prev => [...prev, newGuess]);
    setCurrentGuessResult({ guessValue, actualValue, error: calculatedError });
    setIsNewBestGuess(isNewBest);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all your guess history? This action cannot be undone.')) {
      setGuessHistory([]);
      setCurrentGuessResult(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  };

  const nextMaterial = () => {
    const nextIndex = (currentIndex + 1) % materials.length;
    setCurrentIndex(nextIndex);
    setGuess(-2.0);
    setCurrentGuessResult(null);
    setIsNewBestGuess(false);
  };

  const previousMaterial = () => {
    const prevIndex = currentIndex === 0 ? materials.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setGuess(-2.0);
    setCurrentGuessResult(null);
    setIsNewBestGuess(false);
  };

  const getErrorColor = (error: number) => {
    if (error < 0.1) return 'text-green-600';
    if (error < 0.5) return 'text-yellow-600';
    if (error < 1.0) return 'text-orange-600';
    return 'text-red-600';
  };

  if (!currentMaterial) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <MantineProvider>
      <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 mt-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              MP20 Energy Guesser
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Guess the formation energy per atom (eV/atom) for materials from the MP20 dataset
            </p>
          </div>

                    {/* Crystal Structure Viewer - Full Width */}
          <div className="bg-white rounded-lg shadow-md p-1 mb-6 w-full">
            <div className="rounded-lg flex justify-center relative">
              <div className="w-full h-80">
                <CrystalViewer 
                  atomicNumbers={currentMaterial.atomic_numbers}
                  coords={currentMaterial.atomic_positions}
                  latticeParameters={currentMaterial.lattice_parameters}
                />
              </div>
              
              {/* Overlay Information */}
              <div className="absolute top-1 left-1 z-1 bg-black/50 backdrop-blur-sm text-white rounded-lg px-3 py-2">
                <h3 className="text-lg font-semibold mb-1">{currentMaterial.pretty_formula}</h3>
                <a 
                  href={`https://next-gen.materialsproject.org/materials/${currentMaterial.material_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm mb-1 underline hover:text-blue-300 transition-colors block flex items-center gap-1"
                >
                  {currentMaterial.material_id}
                  <svg 
                    className="w-3 h-3 inline-block" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
                <p className="text-gray-300 text-xs">
                  {currentIndex + 1} of {materials.length.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Guessing Interface */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-4">
              <div>
                <div className="flex flex-col gap-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="font-medium text-lg text-gray-800">
                        Your guess: <span className="font-mono inline-block w-16 text-right">{guess.toFixed(3)}</span> eV/atom
                      </span>
                    </div>
                    <div className="px-4 lg:px-8">
                      <CustomSlider
                        value={guess}
                        onChange={setGuess}
                        min={-5.0}
                        max={0.1}
                        step={0.001}
                        actualValue={currentMaterial.formation_energy_per_atom}
                        showActual={!!currentGuessResult}
                        marks={[
                          { value: -5.0, label: '-5.0' },
                          { value: -4.0, label: '-4.0' },
                          { value: -3.0, label: '-3.0' },
                          { value: -2.0, label: '-2.0' },
                          { value: -1.0, label: '-1.0' },
                          { value: 0.0, label: '0.0' }
                        ]}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 px-4 lg:px-8">
                      <span>More stable</span>
                      <span>Less stable</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex flex-row gap-3 justify-center items-center">
                      <button
                        onClick={previousMaterial}
                        disabled={currentIndex === 0}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                      >
                        <span className="sm:hidden">←</span>
                        <span className="hidden sm:inline">← Previous Material</span>
                      </button>
                                              <button
                          onClick={handleGuess}
                          disabled={!!currentGuessResult}
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                        >
                          <span className="sm:inline">Submit Guess</span>
                        </button>
                        <button
                          onClick={nextMaterial}
                          disabled={currentIndex === materials.length - 1}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                        >
                          <span className="sm:hidden">→</span>
                          <span className="hidden sm:inline">Next Material →</span>
                        </button>
                    </div>
                    {currentGuessResult && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-600 space-y-1 text-center">
                          <div>Your guess: <span className="font-mono">{currentGuessResult.guessValue.toFixed(4)} eV/atom</span></div>
                          <div>Actual: <span className="font-mono">{currentGuessResult.actualValue.toFixed(4)} eV/atom</span></div>
                          <div>Error: <span className={`ml-1 font-semibold ${getErrorColor(currentGuessResult.error)}`}>
                            {currentGuessResult.error.toFixed(4)} eV/atom
                          </span></div>
                          {isNewBestGuess && (
                            <div className="mt-2 px-3 py-2 bg-green-100 border border-green-300 rounded-md">
                              <span className="text-green-800 font-semibold text-sm">
                                🎉 New best guess!
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Distribution Charts */}
          {guessHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-700">Your Performance</h3>
                <button
                  onClick={clearHistory}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Clear History
                </button>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Total guesses: {guessHistory.length}</p>
                <p>Average error: {(guessHistory.reduce((sum, guess) => sum + guess.error, 0) / guessHistory.length).toFixed(4)} eV/atom</p>
                <p>Best guess: {Math.min(...guessHistory.map(g => g.error)).toFixed(4)} eV/atom</p>
              </div>
              
              {/* Scatter Chart - Error over Time */}
              <div className="mb-8">
                <h4 className="text-md font-medium text-gray-700 mb-4 text-center">Error Over Time</h4>
                <div className="h-64">
                  <ScatterChart
                    h={250}
                    data={[
                      {
                        color: 'blue.6',
                        name: 'Your Guesses',
                        data: guessHistory.map((guess, index) => ({
                          x: index + 1,
                          y: guess.error
                        }))
                      }
                    ]}
                    dataKey={{ x: 'x', y: 'y' }}
                    xAxisLabel="Attempt #"
                    yAxisLabel="Error (eV/atom)"
                    withTooltip
                  />
                </div>
              </div>

              {/* Histogram - Error Distribution */}
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-700 mb-4 text-center">Error Histogram</h4>
                <div className="h-64">
                  <BarChart
                    h={250}
                    data={(() => {
                      // Create histogram bins
                      const binSize = 0.1;
                      const maxError = Math.max(...guessHistory.map(g => g.error));
                      const numBins = Math.ceil(maxError / binSize) + 1;
                      const bins = Array.from({ length: numBins }, (_, i) => ({
                        range: `${(i * binSize).toFixed(1)}-${((i + 1) * binSize).toFixed(1)}`,
                        count: 0,
                        binStart: i * binSize
                      }));

                      // Fill bins with data
                      guessHistory.forEach(guess => {
                        const binIndex = Math.floor(guess.error / binSize);
                        if (binIndex < bins.length) {
                          bins[binIndex].count++;
                        }
                      });

                      return bins.filter(bin => bin.count > 0);
                    })()}
                    dataKey="range"
                    series={[{ name: 'count', color: 'blue.6' }]}
                    xAxisLabel="Error Range (eV/atom)"
                    yAxisLabel="# Guesses"
                    withTooltip
                  />
                </div>
              </div>
            </div>
          )}



        </div>
      </div>
    </MantineProvider>
  );
}

// Pre-load materials data at build time for static site generation (SSG)
// This loads a large JSON file (>2MB) containing thousands of materials from the Materials Project database
// with properties like formation energy, band gap, chemical formulas, and crystallographic data.
// By loading at build time instead of client-side, we get faster page loads, better SEO,
// and immediate data availability for the materials guessing game without loading states.
export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  const path = require('path');
  
  const filePath = path.join(process.cwd(), 'public', 'materials', 'mp20_val.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const materials = JSON.parse(jsonData);
  
  return {
    props: {
      materials,
    },
  };
};
