import { streamLasagnaRecipe } from '../../ai';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { modelName } = await request.json();

    if (!modelName) {
      return new Response('Model name is required', { status: 400 });
    }

    return streamLasagnaRecipe(modelName);
  } catch (error) {
    console.error('Error generating lasagna recipe:', error);
    return new Response('Failed to generate lasagna recipe', { status: 500 });
  }
}