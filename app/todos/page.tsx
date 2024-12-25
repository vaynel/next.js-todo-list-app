'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import Calendar from '@/components/Calendar';
import TodoList from '@/components/TodoList';
import FirebaseApp from '@/config/firebaseConfig';
import { Todo } from '@/types/todo'; // 타입 가져오기

// interface Todo {
//   id: string;
//   date: string;
//   task: string; // 할 일 텍스트
//   completed: boolean;
//   uid: string;
// }

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  const [userName, setUserName] = useState<string>(''); // 유저 이름 저장
  const [todos, setTodos] = useState<Todo[]>([]); // Todo 리스트 저장
  const auth = getAuth(FirebaseApp);
  const db = getFirestore(FirebaseApp); // Firestore 초기화

  // Firestore에서 사용자 이름 가져오기
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid); // 'users' 컬렉션에서 UID로 문서 참조
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || '알 수 없는 유저'); // Firestore에서 'name' 필드 가져오기
        } else {
          console.error('사용자 문서를 찾을 수 없습니다.');
        }
      }
    };

    fetchUserName();
  }, [auth, db]);

  // Firestore에서 특정 날짜의 Todo 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      const user = auth.currentUser;
      if (user) {
        const todosQuery = query(
          collection(db, 'todos'),
          where('uid', '==', user.uid),
          where('date', '==', selectedDate),
        );
        const querySnapshot = await getDocs(todosQuery);
        const todosData: Todo[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Todo, 'id'>), // Firestore 데이터의 타입을 명시적으로 변환
        }));
        setTodos(todosData);
      }
    };

    fetchTodos();
  }, [auth, db, selectedDate]);

  // Todo 저장 핸들러
  const handleAddTodo = async (todoText: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Firestore에 새로운 Todo 추가
        const docRef = await addDoc(collection(db, 'todos'), {
          uid: user.uid,
          date: selectedDate,
          task: todoText,
          completed: false,
        });

        // Redux 상태 업데이트
        setTodos([
          ...todos,
          {
            id: docRef.id,
            date: selectedDate,
            task: todoText,
            completed: false,
            uid: user.uid,
          },
        ]);

        alert('Todo가 추가되었습니다.');
      } catch (error) {
        console.error('Todo 추가 실패:', error);
        alert('Todo 추가에 실패했습니다.');
      }
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    if (confirm('로그아웃을 하시겠습니까?')) {
      auth
        .signOut()
        .then(() => {
          alert('로그아웃 되었습니다.');
          window.location.href = '/login'; // 로그아웃 후 로그인 페이지로 이동
        })
        .catch((error) => {
          console.error('로그아웃 실패:', error);
          alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
        });
    }
  };

  // 날짜 선택 핸들러
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <MainContainer>
      {/* 헤더 */}
      <Header>
        <h1>Todo 리스트</h1>
        <UserInfo onClick={handleLogout}>{userName} (로그아웃)</UserInfo>
      </Header>

      {/* 메인 컨텐츠 */}
      <Content>
        <CalendarContainer>
          <Calendar onDateClick={handleDateClick} />
        </CalendarContainer>
        <TodoListContainer>
          <TodoList
            selectedDate={selectedDate}
            todos={todos}
            onAddTodo={handleAddTodo}
          />
        </TodoListContainer>
      </Content>
    </MainContainer>
  );
}

// 스타일 컴포넌트는 동일

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh; /* 전체 화면 높이 */

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;

  h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

const UserInfo = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.lightText};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1; /* 남은 공간을 모두 채움 */
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const CalendarContainer = styled.div`
  flex: 2;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TodoListContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
