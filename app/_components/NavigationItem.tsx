import { css } from '@/styled-system/css';
import Link from 'next/link';

type Props = {
  href: string;
  label: string;
  isCurrentPage: boolean;
};

export const NavigationItem = ({ href, label, isCurrentPage }: Props) => (
  <h2
    className={css({
      display: 'inline-block',
      fontSize: '4vw',
      fontWeight: 'bold',
      backgroundColor: '#4158D0',
      backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: isCurrentPage ? 'saturate(1)' : 'saturate(0)',
      transition: 'filter 1s ease',
      paddingX: '8px',
    })}
  >
    <Link href={href}>{label}</Link>
  </h2>
);
