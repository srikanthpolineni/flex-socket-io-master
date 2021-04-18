import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useRoutes, Routes, Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles'
import DashboardLayout from './components/DashboardLayout'
import theme from './theme'

const routes = [
  {
    path: "/",
    element: <DashboardLayout />
  },
  {
    path: "app",
    element: <DashboardLayout />
  }
];

const App = () => {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider >
  );
};

export default App;
