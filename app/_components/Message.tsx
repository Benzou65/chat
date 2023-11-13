import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { Box } from '@/styled-system/jsx';

const Anchor = dynamic(() => import('./chatHtmlElements').then((mod) => mod.Anchor));
const Code = dynamic(() => import('./chatHtmlElements').then((mod) => mod.Code));
const OrderedList = dynamic(() => import('./chatHtmlElements').then((mod) => mod.OrderedList));
const UnorderedList = dynamic(() => import('./chatHtmlElements').then((mod) => mod.UnorderedList));

import type { Message as TMessage } from 'ai/react';

type Props = {
  message: TMessage;
};

enum Role {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
  Function = 'function',
}

export const Message = ({ message }: Props) => (
  <Box
    display={message.role === Role.System ? 'none' : 'block'}
    key={message.id}
    alignSelf={message.role === Role.Assistant ? 'flex-start' : 'flex-end'}
    padding="16px"
    marginY="8px"
    borderRadius="20px"
    backgroundColor={message.role === Role.Assistant ? 'gray.700' : 'blue.500'}
    maxWidth="90%"
    color="white"
  >
    <ReactMarkdown
      components={{
        code({ className, children }) {
          return (
            <Code
              className={className}
              color={message.role === Role.Assistant ? 'zinc.300' : 'zinc.700'}
            >
              {children}
            </Code>
          );
        },
        ol({ ...props }) {
          return <OrderedList {...props} />;
        },
        ul({ ...props }) {
          return <UnorderedList {...props} />;
        },
        a({ ...props }) {
          return <Anchor {...props} />;
        },
      }}
    >
      {message.content}
    </ReactMarkdown>
  </Box>
);
