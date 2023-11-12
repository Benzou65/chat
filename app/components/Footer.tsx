import { css } from '@/styled-system/css';
import { Box } from './components';

type Props = {
  children?: React.ReactNode;
};

export const Footer = ({ children }: Props) => (
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
    <Box display="flex" alignItems="center" gap="8px" width="min(800px, calc(100vw - 48px))">
      {children}
    </Box>
  </footer>
);
