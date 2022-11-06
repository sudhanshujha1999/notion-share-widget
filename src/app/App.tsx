import React, { FC, lazy, Suspense } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import ErrorBoundary from './components/Atom/ErrorBoundary/ErrorBoundary';
import theme from '../MuiWrapper/theme';

const GlobalLoader = lazy(() => import('./components/Atom/Loader'));
const HomePage = lazy(() => import('./pages/HomePage'));

const App: FC = () => {
  const getFallBackLoader = () => <GlobalLoader />;

  return (
    <>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RecoilRoot>
            <Suspense fallback={getFallBackLoader()}>
              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </Router>
            </Suspense>
          </RecoilRoot>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
