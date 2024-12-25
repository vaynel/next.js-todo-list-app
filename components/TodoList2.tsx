// 'use client';

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/stores/store';
// // import { addTodo, toggleTodo, removeTodo } from '@/stores/todoSlice';
// import styled from 'styled-components';

// interface TodoListProps {
//   selectedDate: string;
// }

// const TodoList = ({ selectedDate }: TodoListProps) => {
//   const todos = useSelector((state: RootState) =>
//     state.todo.todos.filter((todo) => todo.date === selectedDate),
//   );
//   const dispatch = useDispatch();
//   const [task, setTask] = useState('');

//   const handleAddTodo = () => {
//     if (!task.trim()) return;
//     dispatch(
//       addTodo({
//         id: Date.now().toString(),
//         date: selectedDate,
//         task,
//         completed: false,
//       }),
//     );
//     setTask('');
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleAddTodo(); // Enter 키를 누르면 할 일 추가
//     }
//   };

//   return (
//     <TodoContainer>
//       <Header>{selectedDate}의 할 일</Header>
//       <InputContainer>
//         <TodoInput
//           type="text"
//           placeholder="할 일을 입력하세요..."
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
//         />
//         <AddButton onClick={handleAddTodo}>추가</AddButton>
//       </InputContainer>
//       <TodoItems>
//         {todos.map((todo) => (
//           <TodoItem key={todo.id}>
//             <Task
//               completed={todo.completed}
//               onClick={() => dispatch(toggleTodo(todo.id))}
//             >
//               {todo.task}
//             </Task>
//             <DeleteButton onClick={() => dispatch(removeTodo(todo.id))}>
//               삭제
//             </DeleteButton>
//           </TodoItem>
//         ))}
//       </TodoItems>
//     </TodoContainer>
//   );
// };

// export default TodoList;

// const TodoContainer = styled.div`
//   margin-top: 20px;
// `;

// const Header = styled.h2`
//   font-size: 18px;
//   color: ${({ theme }) => theme.colors.text};
//   margin-bottom: 10px;
// `;

// const InputContainer = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// const TodoInput = styled.input`
//   flex: 1;
//   padding: 10px;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: 4px;
//   font-size: 16px;
// `;

// const AddButton = styled.button`
//   padding: 10px 15px;
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const TodoItems = styled.ul``;

// const TodoItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px 0;
//   border-bottom: 1px solid ${({ theme }) => theme.colors.border};
// `;

// const Task = styled.span<{ completed: boolean }>`
//   text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
//   color: ${({ completed, theme }) =>
//     completed ? theme.colors.lightText : theme.colors.text};
//   cursor: pointer;
// `;

// const DeleteButton = styled.button`
//   padding: 5px 10px;
//   background-color: ${({ theme }) => theme.colors.danger};
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #a71d2a;
//   }
// `;
