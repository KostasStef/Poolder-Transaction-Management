import React from 'react';
import dynamic from 'next/dynamic';
import RootLayout from '@/app/layout';

const DynamicClientLayout = dynamic(() => import('./ClientLayout'), { ssr: false });

export default function YourPage({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <DynamicClientLayout>
        {children}
      </DynamicClientLayout>
    </RootLayout>
  );
}