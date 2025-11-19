'use client';

import { Box } from '../../_components/styledHtml';
import { Chat } from '../../_components/Chat';
import { ChatInput } from '../../_components/ChatInput';
import { useChat } from '@ai-sdk/react';
import { Header } from '../../_components/Header';
import { useState, FormEvent, ChangeEvent, useMemo } from 'react';
import { ModelSelector, models } from '../../_components/ModelSelector';
import { Navigation } from '../../_components/Navigation';
import { Footer } from '../../_components/Footer';
import { DefaultChatTransport } from 'ai';

export default function ChatPage() {
  const [model, setModel] = useState(models[0].value);
  const [input, setInput] = useState('');

  // Create a custom transport that includes the model in the request body
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: { model },
      }),
    [model]
  );

  const { messages, status, sendMessage } = useChat({
    transport,
    onError: (error: Error) => {
      console.error('Chat error:', error);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  const isLoading = status === 'submitted' || status === 'streaming';

  return (
    <main>
      <Box maxWidth="breakpoint-xl" mx="auto">
        <Header>
          <Box display="flex" alignItems="baseline" gap="1rem">
            <Navigation />
          </Box>
        </Header>
        <Chat messages={messages} />
        <Footer>
          <ModelSelector onSelect={setModel} />
          <ChatInput
            input={input}
            isDisabled={isLoading}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </Footer>
      </Box>
    </main>
  );
}
