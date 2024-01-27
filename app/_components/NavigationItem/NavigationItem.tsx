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
      fontSize: '3vw',
      fontWeight: 'bold',
      backgroundColor: '#4158D0',
      backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      filter: isCurrentPage ? 'saturate(1)' : 'saturate(0)',
      paddingX: '8px',
    })}
  >
    <Link
      data-testid="NavigationItem_link"
      href={href}
      className={css({
        _hover: {
          textDecoration: 'underline',
          textDecorationThickness: '4px',
          textDecorationColor: '#8454C8',
          textDecorationStyle: 'solid',
          textDecorationSkipInk: 'auto',
          textUnderlineOffset: '8px',
        },
        _focus: {
          textDecoration: 'underline',
          textDecorationThickness: '4px',
          textDecorationColor: '#8454C8',
          textDecorationStyle: 'solid',
          textDecorationSkipInk: 'auto',
          textUnderlineOffset: '8px',
        },
      })}
    >
      {label}
    </Link>
  </h2>
);
