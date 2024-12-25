import { ReactNode } from 'react';
import GlobalStyleWrapper from './GlobalStyleWrapper';
import StyledComponentsRegistry from '../lib/registry';
import ReduxProvider from './ReduxProvider';

export const metadata = {
  title: 'Todo Calendar',
  description: 'Manage your tasks with a calendar and todo list',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/MyTodoCalendar.png" />
      <meta name="theme-color" content="#007bff" />
      <body>
        <StyledComponentsRegistry>
          <ReduxProvider>
            <GlobalStyleWrapper>{children}</GlobalStyleWrapper>
          </ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
