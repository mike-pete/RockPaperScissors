'use client';

import { useState } from 'react';

type RPSChoice = 'rock' | 'paper' | 'scissors';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState(32768);
  const [gameResult, setGameResult] = useState<string>('');
  const [userChoice, setUserChoice] = useState<RPSChoice | null>(null);
  const [llmChoice, setLlmChoice] = useState<RPSChoice | null>(null);

  const handleRPSChoice = async (playerChoice: RPSChoice) => {
    setLoading(true);
    setGameResult('');
    setUserChoice(playerChoice);

    try {
      const response = await fetch('/api/rps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      const llmChoice: RPSChoice = data.choice;
      setLlmChoice(llmChoice);

      const result = determineWinner(playerChoice, llmChoice);
      setGameResult(result);

      if (result === 'You win!') {
        setHealth(prev => Math.max(0, prev - 12195));
      }
    } catch (error) {
      setGameResult('Error: ' + error);
    }
    setLoading(false);
  };

  const determineWinner = (user: RPSChoice, llm: RPSChoice): string => {
    if (user === llm) return 'Tie!';

    const winConditions: Record<RPSChoice, RPSChoice> = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };

    return winConditions[user] === llm ? 'You win!' : 'LLM wins!';
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
              LLM Health: {health.toLocaleString()}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 border-2 border-gray-300">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(health / 32768) * 100}%` }}
              >
                <div className="h-full flex items-center justify-center text-white text-xs font-bold">
                  {health.toLocaleString()} / 32,768
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8 justify-center">
            <button
              onClick={() => handleRPSChoice('rock')}
              disabled={loading}
              className="w-24 h-24 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-4xl flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
            >
              🗿
            </button>
            <button
              onClick={() => handleRPSChoice('paper')}
              disabled={loading}
              className="w-24 h-24 rounded-full bg-green-500 hover:bg-green-600 text-white text-4xl flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
            >
              📄
            </button>
            <button
              onClick={() => handleRPSChoice('scissors')}
              disabled={loading}
              className="w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 text-white text-4xl flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
            >
              ✂️
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Rock Paper Scissors</h2>
            {loading ? (
              <p className="text-lg text-gray-600">LLM is choosing...</p>
            ) : gameResult ? (
              <div className="space-y-4">
                <div className="flex justify-center gap-8 text-6xl">
                  <div className="text-center">
                    <div>You</div>
                    <div>{userChoice === 'rock' ? '🗿' : userChoice === 'paper' ? '📄' : '✂️'}</div>
                  </div>
                  <div className="text-4xl self-center">vs</div>
                  <div className="text-center">
                    <div>LLM</div>
                    <div>{llmChoice === 'rock' ? '🗿' : llmChoice === 'paper' ? '📄' : '✂️'}</div>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${gameResult === 'You win!' ? 'text-green-600' : gameResult === 'LLM wins!' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {gameResult}
                </div>
                {gameResult === 'You win!' && (
                  <p className="text-lg text-green-600">LLM takes 12,195 damage!</p>
                )}
              </div>
            ) : (
              <p className="text-lg text-gray-600">Choose your weapon above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
