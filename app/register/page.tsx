'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import FirebaseApp from '@/config/firebaseConfig';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(''); // Name 필드 추가
  const [error, setError] = useState('');
  const auth = getAuth(FirebaseApp);
  const db = getFirestore(FirebaseApp); // Firestore 초기화
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // Firebase Authentication으로 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Firestore에 사용자 추가 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        name: name, // 사용자 이름
        email: email, // 사용자 이메일
        todos: [], // 초기 todo 배열
      });

      alert(`회원가입 성공! 환영합니다, ${name}`);
      router.push('/login'); // 회원가입 후 로그인 페이지로 이동
    } catch (err) {
      setError(
        `회원가입 실패! 이메일이 이미 등록되었거나 다른 문제가 발생했습니다.\n ${err}`,
      );
    }
  };

  return (
    <Container>
      <Form>
        <Title>회원가입</Title>
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>회원가입</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default RegisterPage;

// 스타일 컴포넌트 동일 (생략)

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 전체 화면 높이 */
  background-color: #f8f9fa; /* 부드러운 배경색 */
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px; /* 최대 너비 */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #ffffff; /* 흰색 배경 */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333333; /* 기본 텍스트 색상 */
  text-align: center; /* 가운데 정렬 */
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ddd; /* 테두리 색상 */
  border-radius: 4px;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  color: #ffffff;
  background-color: #007bff; /* 파란색 버튼 */
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* 마우스 호버 시 색상 변경 */
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545; /* 빨간색 에러 메시지 */
  font-size: 14px;
  text-align: center;
`;
