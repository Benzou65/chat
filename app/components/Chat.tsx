'use client';

import { Message } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { css } from '@/styled-system/css';
import { Box } from './components';
import { NoSSR } from './NoSSR';

type Props = {
  messages: Message[];
};

export const Chat: React.FC<Props> = ({ messages }) => {
  return (
    <NoSSR>
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
                  code({ className, children }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} wrapLongLines>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <pre
                        className={css({
                          display: 'inline-block',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          paddingX: '4px',
                          fontWeight: 'bold',
                          color: 'zinc.300',
                        })}
                      >
                        {String(children)}
                      </pre>
                    );
                  },
                  ol({ ...props }) {
                    return (
                      <ul
                        {...props}
                        className={css({
                          '& li': {
                            listStyleType: 'decimal',
                            '&::marker': {
                              color: 'red.300',
                            },
                          },
                        })}
                      />
                    );
                  },
                  ul({ ...props }) {
                    return (
                      <ul
                        {...props}
                        className={css({
                          '& li': {
                            listStyleType: 'disc',
                            '&::marker': {
                              color: 'red.300',
                            },
                          },
                        })}
                      />
                    );
                  },
                  a({ ...props }) {
                    return (
                      <a
                        target="_blank"
                        {...props}
                        className={css({
                          color: 'blue.300',
                          textDecoration: 'underline',
                          '&:hover': {
                            color: 'blue.500',
                          },
                        })}
                      />
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
    </NoSSR>
  );
};
