import { NextRequest, NextResponse } from 'next/server';
import { analyzeLabReportWithGemini } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { textReport, fileBufferBase64, mimeType, elderName, elderId } = body;

    const analysis = await analyzeLabReportWithGemini({
      textReport,
      fileBufferBase64,
      mimeType,
      elderName,
    });

    return NextResponse.json({
      success: true,
      report: {
        ...analysis,
        elderId: elderId || '',
      },
    });
  } catch (error: any) {
    console.error('API analyze-report error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to analyze report',
      },
      { status: 500 }
    );
  }
}
