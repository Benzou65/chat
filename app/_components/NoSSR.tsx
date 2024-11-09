import dynamic from 'next/dynamic';
import React, { type JSX } from 'react';

interface INoSSR {
  children: React.ReactNode;
}

const _NoSSR: React.FC<INoSSR> = ({ children }: INoSSR): JSX.Element => <>{children}</>;

export const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});
