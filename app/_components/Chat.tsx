import { Message as TMessage } from 'ai/react';
import { Box } from './styledHtml';
import { Message } from './Message';

type Props = {
  messages: TMessage[];
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
          <Message message={message} key={message.id} />
        ))}
      </Box>
    </Box>
  );
};
