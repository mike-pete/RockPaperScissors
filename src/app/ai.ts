import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

export const streamLasagnaRecipe = (modelName: string) => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  });

  const result = streamText({
    model: openrouter(modelName),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });

  return result.toTextStreamResponse();
};

