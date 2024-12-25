'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/stores/store';
import { Todo } from '@/types/todo'; // 타입 가져오기
import {
  fetchTodos,
  addTodoToFirestore,
  toggleTodoInFirestore,
  removeTodoFromFirestore,
} from '@/stores/todoSlice';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// TodoListProps 타입 정의
interface TodoListProps {
  selectedDate: string;
  todos: Todo[];
  onAddTodo: (todoText: string) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({ selectedDate }) => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch: AppDispatch = useDispatch();
  const [task, setTask] = useState('');
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      alert('사용자가 로그인되어 있지 않습니다. 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        router.push('/login'); // 로그인 페이지로 이동
      }, 1000);
      return;
    }

    // Firestore에서 데이터를 항상 가져옴
    dispatch(fetchTodos(selectedDate));
  }, [dispatch, selectedDate, auth]);

  const handleAddTodo = () => {
    const user = auth.currentUser;
    if (!task.trim() || !user) return;
    dispatch(
      addTodoToFirestore({
        date: selectedDate,
        task,
        completed: false,
        uid: user.uid,
      }),
    );
    setTask('');
  };

  // booleanToString 함수 정의
  const booleanToString = (value: boolean): string => value.toString();

  return (
    <TodoContainer>
      <Header>{selectedDate}의 Todo</Header>
      <InputContainer>
        <TodoInput
          type="text"
          placeholder="할 일을 입력하세요..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <AddButton onClick={handleAddTodo}>추가</AddButton>
      </InputContainer>
      <TodoItems>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <Task
              completed={booleanToString(todo.completed)}
              onClick={() => dispatch(toggleTodoInFirestore(todo.id))}
            >
              {todo.task}
            </Task>
            <DeleteButton
              onClick={() => dispatch(removeTodoFromFirestore(todo.id))}
            >
              삭제
            </DeleteButton>
          </TodoItem>
        ))}
      </TodoItems>
    </TodoContainer>
  );
};

export default TodoList;

// Styled-components
const TodoContainer = styled.div`
  margin-top: 20px;
`;

const Header = styled.h2`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TodoInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
`;

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TodoItems = styled.ul``;

const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Task = styled.span<{ completed: string }>`
  text-decoration: ${({ completed }) =>
    completed === 'true' ? 'line-through' : 'none'};
  color: ${({ completed, theme }) =>
    completed === 'true' ? theme.colors.lightText : theme.colors.text};
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.danger};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #a71d2a;
  }
`;
