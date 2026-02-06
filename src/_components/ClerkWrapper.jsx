'use client';

import dynamic from 'next/dynamic';

// Dynamically import ClerkProvider only on client side
const ClerkProvider = dynamic(
  () => import('@clerk/nextjs').then(mod => mod.ClerkProvider),
  { ssr: false }
);

export default function ClerkWrapper({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // If no publishable key or during build, just render children
  if (!publishableKey) {
    return children;
  }
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}


