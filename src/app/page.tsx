'use client';

import { useState } from 'react';

export default function Home() {
  const [modelName, setModelName] = useState('anthropic/claude-3-haiku');
  const [loading, setLoading] = useState(false);
  const [lasagnaRecipe, setLasagnaRecipe] = useState('');
  const [weather, setWeather] = useState('');

  const handleGetLasagna = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/lasagna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelName }),
      });
      const data = await response.json();
      setLasagnaRecipe(data.recipe || data.error);
    } catch (error) {
      setLasagnaRecipe('Error: ' + error);
    }
    setLoading(false);
  };

  const handleGetWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelName }),
      });
      const data = await response.json();
      setWeather(data.weather || data.error);
    } catch (error) {
      setWeather('Error: ' + error);
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
            <option value="anthropic/claude-3-haiku">Claude 3 Haiku</option>
            <option value="anthropic/claude-3-sonnet">Claude 3 Sonnet</option>
            <option value="anthropic/claude-3-opus">Claude 3 Opus</option>
            <option value="openai/gpt-4">GPT-4</option>
            <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              🌤️ Weather Assistant
            </h2>
            <button
              onClick={handleGetWeather}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Getting Weather...' : 'Get San Francisco Weather'}
            </button>
            {weather && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {weather}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            ⚠️ Setup Required
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            Make sure to set your <code className="bg-yellow-100 dark:bg-yellow-800 px-1 py-0.5 rounded">OPENROUTER_API_KEY</code> environment variable.
            Get your API key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline">OpenRouter</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
