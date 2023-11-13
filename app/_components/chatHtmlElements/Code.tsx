import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { css } from '@/styled-system/css';

type Props = {
  className?: string;
  children: React.ReactNode;
  color?: string;
};

export const Code = ({ className, children, color }: Props) => {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} wrapLongLines>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <em
      className={css({
        display: 'inline-block',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingX: '4px',
        fontWeight: 'bold',
        color: color,
      })}
    >
      {String(children)}
    </em>
  );
};
