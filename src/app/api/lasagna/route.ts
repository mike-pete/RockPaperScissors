import { streamLasagnaRecipe } from '../../ai';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const modelName = 'anthropic/claude-3-haiku';

    return streamLasagnaRecipe(modelName);
  } catch (error) {
    console.error('Error generating lasagna recipe:', error);
    return new Response('Failed to generate lasagna recipe', { status: 500 });
  }
}