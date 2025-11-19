import { streamText, UIMessage, convertToModelMessages } from 'ai';

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
  const { messages, model }: { messages: UIMessage[]; model?: Model } = await req.json();

  // Use default model if not provided
  const selectedModel = model || models[0].value;

  if (models.map((m) => m.value).indexOf(selectedModel) === -1) {
    return new Response('Invalid model', { status: 400 });
  }

  const result = streamText({
    model: openai(selectedModel),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
