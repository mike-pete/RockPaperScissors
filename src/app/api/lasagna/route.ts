import { getLasagnaRecipe } from '../../ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { modelName } = await request.json();

    if (!modelName) {
      return NextResponse.json({ error: 'Model name is required' }, { status: 400 });
    }

    const recipe = await getLasagnaRecipe(modelName);
    return NextResponse.json({ recipe });
  } catch (error) {
    console.error('Error generating lasagna recipe:', error);
    return NextResponse.json(
      { error: 'Failed to generate lasagna recipe' },
      { status: 500 }
    );
  }
}