'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [lasagnaRecipe, setLasagnaRecipe] = useState('');

  const handleGetLasagna = async () => {
    setLoading(true);
    setLasagnaRecipe('');
    try {
      const response = await fetch('/api/rps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setLasagnaRecipe((prev) => prev + chunk);
      }
    } catch (error) {
      setLasagnaRecipe('Error: ' + error);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F3F3F3',
        backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%, transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%, transparent),
                         linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%, transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%, transparent)`,
        backgroundSize: '55px 55px'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <div className="text-center text-sm font-semibold text-gray-600 mb-2">
              Context Window: 32,768
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 border-2 border-gray-300">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-300 ease-in-out"
                style={{ width: '100%' }}
              >
                <div className="h-full flex items-center justify-center text-white text-xs font-bold">
                  32,768 / 32,768
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8 justify-center">
            <button className="w-24 h-24 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-4xl flex items-center justify-center shadow-lg transition-colors">
              🗿
            </button>
            <button className="w-24 h-24 rounded-full bg-green-500 hover:bg-green-600 text-white text-4xl flex items-center justify-center shadow-lg transition-colors">
              📄
            </button>
            <button className="w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 text-white text-4xl flex items-center justify-center shadow-lg transition-colors">
              ✂️
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={handleGetLasagna}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Get Vegetarian Lasagna Recipe'}
          </button>
          {lasagnaRecipe && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap text-gray-800">
                {lasagnaRecipe}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
