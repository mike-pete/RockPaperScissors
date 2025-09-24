import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateObject } from 'ai';
import { z } from 'zod';

const RPSChoiceSchema = z.object({
  choice: z.enum(['rock', 'paper', 'scissors']),
});

export const generateRPSChoice = async (modelName: string) => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  });

  // Generate a random seed to encourage variety
  const seed = Math.floor(Math.random() * 1000);

  const result = await generateObject({
    model: openrouter(modelName),
    schema: RPSChoiceSchema,
    prompt: `You are playing rock-paper-scissors. Consider this random seed for variation: ${seed}.

    Important: You must choose exactly ONE of these options with equal probability:
    - "rock"
    - "paper"
    - "scissors"

    Do not explain your choice. Simply return the JSON object with your selection.`,
    mode: 'json',
  });

  return new Response(JSON.stringify(result.object), {
    headers: { 'Content-Type': 'application/json' },
  });
};

