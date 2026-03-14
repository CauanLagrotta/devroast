import { NextResponse } from 'next/server';
import { languageRepository, submissionRepository } from '@/db/repository';
import { submissionMode } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const { code, language, mode } = await request.json();
    
    // Get language by alias
    const languageRecord = await languageRepository.getByAlias(language);
    if (!languageRecord) {
      return NextResponse.json(
        { error: 'Unsupported language' },
        { status: 400 }
      );
    }
    
    // Create submission
    const submission = await submissionRepository.create(
      code,
      languageRecord.id,
      mode as typeof submissionMode.enumValues[number]
    );
    
    // TODO: Integrate with actual code analysis service
    // For now, we'll return a mock score and feedback
    const mockScore = Math.floor(Math.random() * 100);
    const mockFeedback = mode === 'roast' 
      ? "Seu código parece ter sido escrito por um estagiário que acabou de descobrir o que é um loop."
      : "Seu código tem potencial, mas considere melhorar a legibilidade e seguir as melhores práticas.";
    
    // Update submission with analysis results
    await submissionRepository.updateScoreAndFeedback(
      submission.id,
      mockScore,
      mockFeedback
    );
    
    return NextResponse.json({
      id: submission.id,
      score: mockScore,
      feedback: mockFeedback
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}