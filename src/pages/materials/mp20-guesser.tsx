import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { CrystalViewer } from '@/components/materials/CrystalViewer';
import { MantineProvider } from '@mantine/core';

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

interface Props {
  materials: Material[];
}

export default function MP20Guesser({ materials }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [hasGuessed, setHasGuessed] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Get current material
  const currentMaterial = materials[currentIndex];

  // Handle URL hash changes
  useEffect(() => {
    const updateIndexFromHash = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash && !isNaN(Number(hash))) {
        const index = Math.max(0, Math.min(Number(hash), materials.length - 1));
        setCurrentIndex(index);
        setHasGuessed(false);
        setGuess('');
        setError(null);
        setShowAnswer(false);
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
    const guessValue = parseFloat(guess);
    if (isNaN(guessValue)) {
      alert('Please enter a valid number');
      return;
    }

    const actualValue = currentMaterial.formation_energy_per_atom;
    const calculatedError = Math.abs(guessValue - actualValue);
    
    setError(calculatedError);
    setHasGuessed(true);
    setShowAnswer(true);
  };

  const nextMaterial = () => {
    const nextIndex = (currentIndex + 1) % materials.length;
    setCurrentIndex(nextIndex);
    setHasGuessed(false);
    setGuess('');
    setError(null);
    setShowAnswer(false);
  };

  const previousMaterial = () => {
    const prevIndex = currentIndex === 0 ? materials.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setHasGuessed(false);
    setGuess('');
    setError(null);
    setShowAnswer(false);
  };

  const getErrorColor = (error: number) => {
    if (error < 0.1) return 'text-green-600';
    if (error < 0.5) return 'text-yellow-600';
    if (error < 1.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getErrorMessage = (error: number) => {
    if (error < 0.05) return 'Excellent! Very close!';
    if (error < 0.1) return 'Great guess!';
    if (error < 0.5) return 'Pretty good!';
    if (error < 1.0) return 'Not bad!';
    if (error < 2.0) return 'Keep trying!';
    return 'Way off, but that\'s how we learn!';
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
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Crystal Structure Viewer */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Crystal Structure</h3>
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
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    The MP20 dataset doesn't include atomic positions for visualization. 
                    Only formation energies and basic material properties are provided.
                  </p>
                  <div className="mt-4 text-xs text-gray-400">
                    Formula: <span className="font-mono">{currentMaterial.pretty_formula}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Material Properties and Guessing Interface */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                {currentMaterial.pretty_formula}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Material ID: {currentMaterial.material_id}
              </p>
              
              {/* Material Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Lattice Parameters</h3>
                  <div className="space-y-1 text-gray-600">
                    <div>a = {currentMaterial.lattice_parameters.a.toFixed(3)} Å</div>
                    <div>b = {currentMaterial.lattice_parameters.b.toFixed(3)} Å</div>
                    <div>c = {currentMaterial.lattice_parameters.c.toFixed(3)} Å</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Angles</h3>
                  <div className="space-y-1 text-gray-600">
                    <div>α = {currentMaterial.lattice_parameters.alpha.toFixed(1)}°</div>
                    <div>β = {currentMaterial.lattice_parameters.beta.toFixed(1)}°</div>
                    <div>γ = {currentMaterial.lattice_parameters.gamma.toFixed(1)}°</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <span className="font-medium text-gray-700">Band Gap:</span>
                  <span className="ml-2 text-gray-600">{currentMaterial.band_gap.toFixed(4)} eV</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">E above hull:</span>
                  <span className="ml-2 text-gray-600">{currentMaterial.e_above_hull.toFixed(6)} eV/atom</span>
                </div>
              </div>
            </div>

            {/* Guessing Interface */}
            {!hasGuessed ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="guess" className="block text-sm font-medium text-gray-700 mb-2">
                    Your guess for formation energy per atom (eV/atom):
                  </label>
                  <div className="flex flex-col gap-3">
                    <input
                      type="number"
                      id="guess"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      placeholder="e.g., -2.5"
                      step="0.01"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleGuess();
                        }
                      }}
                    />
                    <button
                      onClick={handleGuess}
                      disabled={!guess.trim()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Make Guess
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Hint: Formation energies are usually negative for stable compounds
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Results */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Results</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Your guess:</span>
                      <span className="ml-2">{parseFloat(guess).toFixed(4)} eV/atom</span>
                    </div>
                    {showAnswer && (
                      <>
                        <div>
                          <span className="font-medium">Actual value:</span>
                          <span className="ml-2">{currentMaterial.formation_energy_per_atom.toFixed(4)} eV/atom</span>
                        </div>
                        <div>
                          <span className="font-medium">Your error:</span>
                          <span className={`ml-2 font-semibold ${getErrorColor(error!)}`}>
                            {error!.toFixed(4)} eV/atom
                          </span>
                        </div>
                        <div className={`font-medium ${getErrorColor(error!)}`}>
                          {getErrorMessage(error!)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-8">
          <button
            onClick={previousMaterial}
            className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            ← Previous Material
          </button>
          
          {hasGuessed && (
            <button
              onClick={nextMaterial}
              className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Next Material →
            </button>
          )}
          
          <button
            onClick={nextMaterial}
            className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors text-sm"
          >
            Skip
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">How to play:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Look at the material formula and properties</li>
            <li>• Guess the formation energy per atom in eV/atom</li>
            <li>• More negative values indicate more stable compounds</li>
            <li>• Use the URL hash (#) to share specific materials</li>
            <li>• Navigate with buttons or change the URL directly</li>
          </ul>
        </div>
      </div>
    </div>
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
