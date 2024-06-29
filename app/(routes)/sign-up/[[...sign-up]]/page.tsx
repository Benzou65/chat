import { Box } from '@/styled-system/jsx';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <SignUp />
    </Box>
  );
}
