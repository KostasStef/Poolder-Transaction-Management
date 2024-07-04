'use client'
import * as React from 'react';
import Layout from '@/components/menus/LayoutDrawer';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <main style={{ flexGrow: 1, padding: '24px', minHeight: '100vh' }}>
        <Layout>
          {children}
        </Layout>
      </main>
    </div>
  );
};

export default ClientLayout;