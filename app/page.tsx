'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/todos');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <p>로그인 상태를 확인 중입니다...</p>
    </div>
  );
};

export default HomePage;
