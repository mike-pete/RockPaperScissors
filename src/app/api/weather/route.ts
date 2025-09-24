import { getWeather } from '../../ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { modelName } = await request.json();

    if (!modelName) {
      return NextResponse.json({ error: 'Model name is required' }, { status: 400 });
    }

    const weather = await getWeather(modelName);
    return NextResponse.json({ weather });
  } catch (error) {
    console.error('Error getting weather:', error);
    return NextResponse.json(
      { error: 'Failed to get weather' },
      { status: 500 }
    );
  }
}