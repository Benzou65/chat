import { css } from '@/styled-system/css';
import React from 'react';

export const OrderedList = (
  props: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
) => (
  <ol
    {...props}
    className={css({
      paddingLeft: '16px',
      '& li': {
        listStyleType: 'decimal',
        '&::marker': {
          color: 'red.300',
        },
      },
    })}
  />
);
