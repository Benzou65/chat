import { Box } from '@/styled-system/jsx';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <SignIn />
    </Box>
  );
}
