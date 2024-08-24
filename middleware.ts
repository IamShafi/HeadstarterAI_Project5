import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-up',
  '/sign-in',
  '/sign-in/(.*)'  // Ensure catch-all routes under /sign-in are included
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

// Define matcher configuration to include paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
