import { streamWeather } from '../../ai';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { modelName } = await request.json();

    if (!modelName) {
      return new Response('Model name is required', { status: 400 });
    }

    return streamWeather(modelName);
  } catch (error) {
    console.error('Error getting weather:', error);
    return new Response('Failed to get weather', { status: 500 });
  }
}