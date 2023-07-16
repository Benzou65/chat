import { Box, Svg } from './components';
import { SVGProps } from 'react';

export const SendIcon = (props: SVGProps<SVGElement>) => (
  <Box>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? 48}
      height={props.height ?? 48}
      viewBox="0 -960 960 960"
      fill={props.fill ?? '#000000'}
      transition={'fill 0.4s ease-in-out'}
    >
      <path d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z" />
    </Svg>
  </Box>
);
