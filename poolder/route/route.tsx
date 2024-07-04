"use client";

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getUser } from '@/services/transactionService';

const ProtectedRoute = ({ children }: any) => {
const { isLoading } = useSessionContext();
  const user = getUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.push('/login');
    }
  }, [user, router]);

  return children;
};

export default ProtectedRoute;
