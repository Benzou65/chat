'use client';

import { Message } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { css } from '@/styled-system/css';
import { Box } from './components';

type Props = {
  messages: Message[];
};

export const Chat: React.FC<Props> = ({ messages }) => {
  return (
    <Box
      paddingX="16px"
      height={'auto'}
      overflowY={'scroll'}
      _scrollbar={{ display: 'none' }}
      pb="footer"
    >
      <Box overflowY={'auto'} display="flex" flexWrap="wrap" flexDirection="column">
        {messages.map((message) => (
          <Box
            display={message.role === 'system' ? 'none' : 'block'}
            key={message.id}
            alignSelf={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            padding="16px"
            marginY="8px"
            borderRadius="20px"
            backgroundColor={message.role === 'assistant' ? 'gray.700' : 'blue.500'}
            maxWidth="90%"
          >
            <ReactMarkdown
              className={css({
                color: 'white',
                '& ol,ul': {
                  paddingLeft: '16px',
                },
              })}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter {...props} style={vscDarkPlus} language={match[1]}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
