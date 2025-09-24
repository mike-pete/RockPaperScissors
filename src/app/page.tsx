'use client';

import { useState } from 'react';

export default function Home() {
  const [modelName, setModelName] = useState('mistralai/ministral-3b');
  const [loading, setLoading] = useState(false);
  const [lasagnaRecipe, setLasagnaRecipe] = useState('');

  const handleGetLasagna = async () => {
    setLoading(true);
    setLasagnaRecipe('');
    try {
      const response = await fetch('/api/lasagna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelName }),
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
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          AI Demo App
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select AI Model:
          </label>
          <select
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="google/gemini-exp-1121">Gemini Experimental 1121</option>
            <option value="anthropic/claude-3-haiku">Claude 3 Haiku</option>
            <option value="anthropic/claude-3-sonnet">Claude 3 Sonnet</option>
            <option value="anthropic/claude-3-opus">Claude 3 Opus</option>
            <option value="openai/gpt-4">GPT-4</option>
            <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            🍝 Lasagna Recipe Generator
          </h2>
          <button
            onClick={handleGetLasagna}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Get Vegetarian Lasagna Recipe'}
          </button>
          {lasagnaRecipe && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                {lasagnaRecipe}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
