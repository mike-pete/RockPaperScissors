import { generateRPSChoice } from '../../ai';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { chatHistory = [], userChoice } = body;

    const modelName = 'anthropic/claude-3-haiku';

    return await generateRPSChoice(modelName, chatHistory, userChoice);
  } catch (error) {
    console.error('Error generating RPS choice:', error);
    return new Response('Failed to generate RPS choice', { status: 500 });
  }
}