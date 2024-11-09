import { streamText, type CoreMessage } from 'ai';

import { auth } from '@clerk/nextjs/server';
import { models, Model } from '@/app/_components/ModelSelector';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response('You must be logged in to use this app.', { status: 401 });
  }

  // Extract the `messages` from the body of the request
  const { messages, model }: { messages: CoreMessage[]; model: Model } = await req.json();

  if (!model) {
    return new Response('You must provide a model', { status: 400 });
  }
  if (models.map((model) => model.value).indexOf(model) === -1) {
    return new Response('Invalid model', { status: 400 });
  }

  const result = await streamText({
    model: openai(model),
    messages,
  });

  return result.toDataStreamResponse();
}
