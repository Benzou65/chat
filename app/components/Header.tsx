import { css } from '@/styled-system/css';
import { NoSSR } from './NoSSR';
import { UserButton } from '@clerk/nextjs';

type Props = {
  children?: React.ReactNode;
};

export const Header = ({ children }: Props) => {
  return (
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
      {children}
      <NoSSR>
        <UserButton afterSignOutUrl="/" />
      </NoSSR>
    </header>
  );
};
