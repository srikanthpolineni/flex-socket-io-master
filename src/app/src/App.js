import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { useRoutes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles'
import DashboardLayout from './components/DashboardLayout'
import theme from './theme'

const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <div>Account</div> }
    ]
  },
  {
    path: "app",
    element: <DashboardLayout />,
    children:[
      { path: 'account', element: <div>Account</div> }
    ]
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
