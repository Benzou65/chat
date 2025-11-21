import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/chat(.*)', '/image(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const resolvedAuth = await auth();

  if (!resolvedAuth.userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    return resolvedAuth.redirectToSignIn();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
