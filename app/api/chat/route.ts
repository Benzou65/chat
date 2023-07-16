import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { currentUser } from '@clerk/nextjs';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const user = await currentUser();
  const authorizedUser = process.env.AUTHORIZED_USER;

  if (!user?.emailAddresses.find((email) => email.emailAddress === authorizedUser)) {
    return new Response('You are not authorized to use this app.', { status: 401 });
  }

  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
    user: user?.id,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
