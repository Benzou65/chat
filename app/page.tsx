'use client';

import { Box } from './components/components';
import { css } from '@/styled-system/css';
import { Chat } from './components/Chat';
import { ChatInput } from './components/ChatInput';
import { useChat } from 'ai/react';
import { UserButton } from '@clerk/nextjs';
import { NoSSR } from './components/NoSSR';
import { useState } from 'react';
import { ModelSelector, models } from './components/ModelSelector';

export default function Home() {
  const [model, setModel] = useState(models[0].value);
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
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
        <header
          className={css({
            position: 'sticky',
            top: 0,
            height: 'header',
            paddingX: '16px',
            background:
              'linear-gradient(180deg, rgba(17,24,39,1) 0%, rgba(17,24,39,1) 70%, rgba(17,24,39,0.5018382352941176) 85%, rgba(17,24,39,0) 100%);',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <h1
            className={css({
              display: 'inline-block',
              fontSize: '8vw',
              fontWeight: 'bold',
              backgroundColor: '#4158D0',
              backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            })}
          >
            BenzouGPT
          </h1>
          <ModelSelector onSelect={setModel} />
          <NoSSR>
            <UserButton afterSignOutUrl="/" />
          </NoSSR>
        </header>
        <Chat messages={messages} />
        <footer
          className={css({
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'linear-gradient(0deg, rgba(17,24,39,1) 0%, rgba(17,24,39,1) 70%, rgba(17,24,39,0.5018382352941176) 85%, rgba(17,24,39,0) 100%);',
          })}
        >
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </footer>
      </Box>
    </main>
  );
}
