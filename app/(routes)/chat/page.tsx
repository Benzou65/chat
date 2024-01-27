'use client';

import { Box } from '../../_components/styledHtml';
import { Chat } from '../../_components/Chat';
import { ChatInput } from '../../_components/ChatInput';
import { useChat } from 'ai/react';
import { Header } from '../../_components/Header';
import { useState } from 'react';
import { ModelSelector, models } from '../../_components/ModelSelector';
import { Navigation } from '../../_components/Navigation';
import { Footer } from '../../_components/Footer';

export default function ChatPage() {
  const [model, setModel] = useState(models[0].value);
  const { messages, input, isLoading, handleInputChange, handleSubmit, setMessages } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'system',
        content:
          '[If you answer with markdown code, you should precise the langage after the first three backticks like this: ```js\nconsole.log("Hello world")\n```.]',
      },
    ],
    body: {
      model: model,
    },
    onError: (error) => {
      setMessages([
        {
          id: '666',
          role: 'assistant',
          content: error.message,
        },
      ]);
    },
  });

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
