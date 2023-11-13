import { css } from '@/styled-system/css';

export const UnorderedList = (
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
) => (
  <ul
    {...props}
    className={css({
      paddingLeft: '16px',
      '& li': {
        listStyleType: 'disc',
        '&::marker': {
          color: 'red.300',
        },
      },
    })}
  />
);
