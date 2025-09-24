import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { z } from 'zod';

export const getLasagnaRecipe = async (modelName: string) => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  });

  const response = streamText({
    model: openrouter(modelName),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });

  await response.consumeStream();
  return response.text;
};

export const getWeather = async (modelName: string) => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  });

  const response = streamText({
    model: openrouter(modelName),
    prompt: 'What is the weather in San Francisco, CA in Fahrenheit?',
    tools: {
      getCurrentWeather: {
        description: 'Get the current weather in a given location',
        inputSchema: z.object({
          location: z
            .string()
            .describe('The city and state, e.g. San Francisco, CA'),
          unit: z.enum(['celsius', 'fahrenheit']).optional(),
        }),
        execute: async ({ location, unit = 'celsius' }) => {
          // Mock response for the weather
          const weatherData: Record<string, Record<string, string>> = {
            'Boston, MA': {
              celsius: '15°C',
              fahrenheit: '59°F',
            },
            'San Francisco, CA': {
              celsius: '18°C',
              fahrenheit: '64°F',
            },
          };

          const weather = weatherData[location];
          if (!weather) {
            return `Weather data for ${location} is not available.`;
          }

          return `The current weather in ${location} is ${weather[unit]}.`;
        },
      },
    },
  });

  await response.consumeStream();
  return response.text;
};
