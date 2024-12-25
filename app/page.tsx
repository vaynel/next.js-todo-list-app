'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';
import styled from 'styled-components';

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
    <Container>
      <Message>로그인 상태를 확인 중입니다...</Message>
    </Container>
  );
};

export default HomePage;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 전체 화면 높이 */
  background-color: #f8f9fa; /* 부드러운 배경색 */
`;

const Message = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #007bff; /* 파란색 텍스트 */
  text-align: center;
`;
