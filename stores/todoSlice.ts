import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import FirebaseApp from '@/config/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { RootState } from '@/stores/store';
import { Todo } from '@/types/todo'; // 타입 가져오기

const db = getFirestore(FirebaseApp);

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (selectedDate: string, { getState }) => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('사용자가 로그인되어 있지 않습니다.');
    }

    // Firestore에서 선택된 날짜의 Todo 가져오기
    const todosQuery = query(
      collection(db, 'todos'),
      where('uid', '==', user.uid),
      where('date', '==', selectedDate),
    );
    const querySnapshot = await getDocs(todosQuery);

    const firestoreTodos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Todo, 'id'>),
    }));

    // Redux store의 현재 상태 가져오기
    const state = getState() as RootState;
    const existingTodos = state.todo.todos;

    // 필요한 동작: Firestore 데이터를 Redux store에 덮어씌우기
    return firestoreTodos;
  },
);

// Firestore에 Todo 추가
export const addTodoToFirestore = createAsyncThunk(
  'todo/addTodo',
  async (todo: Omit<Todo, 'id'>) => {
    const docRef = await addDoc(collection(db, 'todos'), todo);
    return { id: docRef.id, ...todo };
  },
);

// Firestore에서 Todo 상태 토글
export const toggleTodoInFirestore = createAsyncThunk(
  'todo/toggleTodo',
  async (id: string) => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, { completed: false });
    return id;
  },
);

// Firestore에서 Todo 삭제
export const removeTodoFromFirestore = createAsyncThunk(
  'todo/removeTodo',
  async (id: string) => {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
    return id;
  },
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Firestore에서 Todo 가져오기
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      // Firestore에 Todo 추가
      .addCase(addTodoToFirestore.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      // Firestore에서 Todo 상태 토글
      .addCase(toggleTodoInFirestore.fulfilled, (state, action) => {
        const todo = state.todos.find((t) => t.id === action.payload);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })
      // Firestore에서 Todo 삭제
      .addCase(removeTodoFromFirestore.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
