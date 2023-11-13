import { css } from '@/styled-system/css';

export const Anchor = (
  props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) => (
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
