import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Code = ({ className, children }: Props) => {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language={match[1]}
      wrapLongLines
      customStyle={{ borderRadius: '16px' }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <SyntaxHighlighter
      style={vscDarkPlus}
      language="text"
      wrapLongLines
      customStyle={{ borderRadius: '8px', padding: '0.4em 1em', display: 'inline-flex' }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};
