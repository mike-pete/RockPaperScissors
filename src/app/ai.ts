import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { z } from 'zod';
import { beeMovie } from './api/rps/beeMovie';

const RPSChoiceSchema = z.object({
  choice: z.enum(['rock', 'paper', 'scissors']),
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const generateRPSChoice = async (modelName: string, chatHistory: ChatMessage[] = [], userChoice?: string) => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  });

  // Generate a random seed to encourage variety
  const seed = Math.floor(Math.random() * 1000);

  // Process chat history to inject bee movie script when needed
  const processedHistory = chatHistory.map(msg => {
    if (msg.content.includes('[BEE_MOVIE_SCRIPT]')) {
      return {
        ...msg,
        content: msg.content.replace('[BEE_MOVIE_SCRIPT]', beeMovie)
      };
    }
    return msg;
  });

  // Build the messages array
  const messages = [
    ...processedHistory,
    {
      role: 'user' as const,
      content: `You are playing rock-paper-scissors. Consider this random seed for variation: ${seed}.${userChoice ? ` The human chose: ${userChoice}.` : ''}

      Important: You must choose exactly ONE of these options with equal probability:
      - "rock"
      - "paper"
      - "scissors"

      Do not explain your choice. Simply return the JSON object with your selection.`
    }
  ];

  const result = await generateObject({
    model: openrouter(modelName),
    schema: RPSChoiceSchema,
    messages,
    mode: 'json',
  });

  return new Response(JSON.stringify(result.object), {
    headers: { 'Content-Type': 'application/json' },
  });
};

