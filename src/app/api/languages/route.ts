import { NextResponse } from 'next/server';
import { languageRepository } from '@/db/repository';

export async function GET() {
  try {
    const languages = await languageRepository.getAll();
    return NextResponse.json(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}