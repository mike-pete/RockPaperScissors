import { generateRPSChoice } from '../../ai';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const modelName = 'anthropic/claude-3-haiku';

    return await generateRPSChoice(modelName);
  } catch (error) {
    console.error('Error generating RPS choice:', error);
    return new Response('Failed to generate RPS choice', { status: 500 });
  }
}