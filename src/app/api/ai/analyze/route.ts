import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    // Initialize the OpenAI client inside the handler so it doesn't crash the Next.js build
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
    });
    
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Missing title or description' }, { status: 400 });
    }

    const prompt = `
      You are an AI assistant for a legal aid NGO called IPBLI.
      Your task is to analyze the following case description submitted by an applicant.
      
      Title: ${title}
      Description: ${description}
      
      Please provide a JSON response with the following strictly formatted fields:
      1. "category": A classification (e.g., "Criminal Defense", "Domestic Violence", "Bail Application", "False Implication", "Appeal").
      2. "urgencyScore": An integer from 1 to 10 (10 being immediate danger or imminent hearing).
      3. "summary": A concise 2-sentence summary for the internal admin team.
      4. "missingDocuments": An array of strings predicting what documents might be missing based on standard cases (e.g., ["FIR Copy", "Income Certificate"]).
      
      Do NOT provide legal advice. Only return the JSON.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const aiResultText = response.choices[0].message.content;
    
    if (!aiResultText) {
      throw new Error("No response from OpenAI");
    }

    const aiResult = JSON.parse(aiResultText);

    return NextResponse.json(aiResult);
  } catch (error: any) {
    console.error('Error in AI analysis:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
