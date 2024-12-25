'use client'; // 클라이언트 컴포넌트 선언

import { createGlobalStyle, ThemeProvider, styled } from 'styled-components';
// import GlobalStyles from '@/styles/globalStyles';
import theme from '@/styles/theme';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
  }
`;

const GlobalStyleWrapper = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading); // Redux의 로딩 상태 가져오기

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingScreen>로딩 중...</LoadingScreen>}
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default GlobalStyleWrapper;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  z-index: 1000;
`;
