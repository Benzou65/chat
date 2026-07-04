import { auth } from '@clerk/nextjs/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function checkImagePrompt(prompt: string) {
  if (prompt.length > 4000) {
    return prompt.slice(0, 4000);
  }
  return prompt;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response('You must be logged in to use this app.', { status: 401 });
    }

    const { prompt }: { prompt: string } = await req.json();

    const validPrompt = checkImagePrompt(prompt);

    const response = await openai.images.generate({
      model: 'gpt-image-1',
      prompt: validPrompt,
      size: '1024x1024',
      n: 1,
      quality: 'auto',
      user: userId,
    });

    return Response.json(response);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error);
      return new Response(error.message, { status: error.status });
    }
  }
}
