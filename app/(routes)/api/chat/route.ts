import { OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai-edge';
import { currentUser } from '@clerk/nextjs';
import { models, Model } from '@/app/_components/ModelSelector';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return new Response('You must be logged in to use this app.', { status: 401 });
  }

  // Extract the `messages` from the body of the request
  const { messages, model }: { messages: ChatCompletionRequestMessage[]; model: Model } =
    await req.json();

  if (!model) {
    return new Response('You must provide a model', { status: 400 });
  }
  if (models.map((model) => model.value).indexOf(model) === -1) {
    return new Response('Invalid model', { status: 400 });
  }

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: model,
    stream: true,
    messages,
    user: user.id,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
