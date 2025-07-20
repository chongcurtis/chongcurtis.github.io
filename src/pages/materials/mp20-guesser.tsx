import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CrystalViewer } from '@/components/materials/CrystalViewer';
import { MantineProvider, Slider } from '@mantine/core';
import { ScatterChart } from '@mantine/charts';
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

export default function MP20Guesser({ materials }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState(-2.0); // Default slider value
  const [guessHistory, setGuessHistory] = useState<GuessHistory[]>([]);
  const [lastGuessError, setLastGuessError] = useState<{ formula: string; error: number } | null>(null);
  
  // Get current material
  const currentMaterial = materials[currentIndex];

  // Handle URL hash changes
  useEffect(() => {
    const updateIndexFromHash = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash && !isNaN(Number(hash))) {
        const index = Math.max(0, Math.min(Number(hash), materials.length - 1));
        setCurrentIndex(index);
        setGuess(-2.0);
      }
    };

    updateIndexFromHash();
    window.addEventListener('hashchange', updateIndexFromHash);
    return () => window.removeEventListener('hashchange', updateIndexFromHash);
  }, [materials.length]);

  // Update URL when index changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = currentIndex.toString();
    }
  }, [currentIndex]);

  const handleGuess = () => {
    const guessValue = guess;
    if (isNaN(guessValue)) {
      alert('Please enter a valid number');
      return;
    }

    const actualValue = currentMaterial.formation_energy_per_atom;
    const calculatedError = Math.abs(guessValue - actualValue);
    
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
    setLastGuessError({ formula: currentMaterial.pretty_formula, error: calculatedError });
    
    // Auto-advance to next material
    setTimeout(() => {
      nextMaterial();
    }, 100); // Small delay to show the error briefly
  };

  const nextMaterial = () => {
    const nextIndex = (currentIndex + 1) % materials.length;
    setCurrentIndex(nextIndex);
    setGuess(-2.0);
  };

  const previousMaterial = () => {
    const prevIndex = currentIndex === 0 ? materials.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setGuess(-2.0);
  };

  const getErrorColor = (error: number) => {
    if (error < 0.1) return 'text-green-600';
    if (error < 0.5) return 'text-yellow-600';
    if (error < 1.0) return 'text-orange-600';
    return 'text-red-600';
  };

  // Check if current material has structural data
  const hasStructuralData = currentMaterial?.atomic_numbers?.length > 0 && currentMaterial?.atomic_positions?.length > 0;

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
      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              MP20 Energy Guesser
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Guess the formation energy per atom (eV/atom) for materials from the MP20 dataset
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Material {currentIndex + 1} of {materials.length.toLocaleString()}
            </p>
            {lastGuessError && (
              <div className="mt-3 inline-block bg-gray-100 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-600">
                  Previous: <span className="font-mono">{lastGuessError.formula}</span> - Error: 
                  <span className={`ml-1 font-semibold ${getErrorColor(lastGuessError.error)}`}>
                    {lastGuessError.error.toFixed(4)} eV/atom
                  </span>
                </span>
              </div>
            )}
          </div>

                    {/* Crystal Structure Viewer - Full Width */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{currentMaterial.pretty_formula}</h3>
            <p className="text-gray-600 text-sm mb-4">Material ID: {currentMaterial.material_id}</p>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              {hasStructuralData ? (
                <div className="w-full h-full">
                  <CrystalViewer 
                    atomicNumbers={currentMaterial.atomic_numbers}
                    coords={currentMaterial.atomic_positions}
                    latticeParameters={currentMaterial.lattice_parameters}
                  />
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🔬</div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    Structure Not Available
                  </h4>
                  <div className="mt-4 text-xs text-gray-400">
                    Formula: <span className="font-mono">{currentMaterial.pretty_formula}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guessing Interface */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="guess" className="block text-sm font-medium text-gray-700 mb-2">
                  Your guess for formation energy per atom (eV/atom):
                </label>
                <div className="flex flex-col gap-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="font-medium text-lg text-gray-800">{guess.toFixed(3)} eV/atom</span>
                    </div>
                    <div className="px-4 lg:px-8">
                      <Slider
                        value={guess}
                        onChange={setGuess}
                        min={-5.0}
                        max={0.1}
                        step={0.001}
                        size="lg"
                        color="blue"
                        label={(value) => `${value.toFixed(3)} eV/atom`}
                        marks={[
                          { value: -5.0, label: '-5.0' },
                          { value: -4.0, label: '-4.0' },
                          { value: -3.0, label: '-3.0' },
                          { value: -2.0, label: '-2.0' },
                          { value: -1.0, label: '-1.0' },
                          { value: 0.0, label: '0.0' },
                        ]}
                        thumbSize={20}
                        classNames={{
                          root: 'py-4',
                          thumb: 'border-2 border-white shadow-md',
                          track: 'h-2',
                          bar: 'h-2',
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 px-4 lg:px-8">
                      <span>More stable</span>
                      <span>Less stable</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={handleGuess}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Submit Guess
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Hint: More negative values indicate more stable compounds. Most materials have formation energies between -5 and 0 eV/atom.
              </p>
            </div>
          </div>

          {/* Error Distribution Chart */}
          {guessHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Error Distribution</h3>
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
              <div className="mt-4 text-sm text-gray-600">
                <p>Total guesses: {guessHistory.length}</p>
                <p>Average error: {(guessHistory.reduce((sum, guess) => sum + guess.error, 0) / guessHistory.length).toFixed(4)} eV/atom</p>
                <p>Best guess: {Math.min(...guessHistory.map(g => g.error)).toFixed(4)} eV/atom</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-8">
            <button
              onClick={previousMaterial}
              className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              ← Previous Material
            </button>
            
            <button
              onClick={nextMaterial}
              className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors text-sm"
            >
              Skip
            </button>
          </div>

        </div>
      </div>
    </MantineProvider>
  );
}

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
