import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { currentUser } from '@clerk/nextjs';
import { createClient } from '@/prismicio';

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
    return new Response('You are not logged.', { status: 401 });
  }
  const userEmailAddresses = user?.emailAddresses.map((email) => email.emailAddress);
  const client = createClient();
  const auth = await client.getSingle('auth');
  const authorizedUsers = auth.data.authorized_users.map((user) => user.email);
  const isAuthorized = userEmailAddresses.some((user) => authorizedUsers.includes(user));

  if (!isAuthorized) {
    return new Response('You are not authorized to use this app.', { status: 401 });
  }

  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-16k',
    stream: true,
    messages,
    user: user?.id,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
