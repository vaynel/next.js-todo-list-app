'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import FirebaseApp from '@/config/firebaseConfig';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { startLoading, stopLoading } from '@/stores/loadingSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(FirebaseApp);
  const [error, setError] = useState('');
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(startLoading()); // 전역 로딩 시작
    setError(''); // 에러 초기화

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // 사용자 정보를 세션 스토리지에 저장
      sessionStorage.setItem(
        'user',
        JSON.stringify({ email: user.email, uid: user.uid }),
      );

      // 성공적으로 로그인되면 '/todos' 페이지로 이동
      router.push('/todos');
    } catch (err) {
      alert('로그인 실패! 이메일 또는 비밀번호를 확인하세요.'); // 실패 시 alert
      setError(`로그인 실패! 이메일 또는 비밀번호를 확인하세요.\n ${err}`);
    } finally {
      dispatch(stopLoading()); // 전역 로딩 종료
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleLogin(); // Enter 키를 누르면 로그인 함수 실행
    }
  };

  return (
    <Container>
      <Form onKeyDown={handleKeyDown}>
        <Title>나의 Todo 달력</Title>
        <Input
          type="email"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>로그인</Button>
        <Link href={'/register'}>회원가입</Link>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default LoginPage;

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 15px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #007bff;
    background-color: #ffffff;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
