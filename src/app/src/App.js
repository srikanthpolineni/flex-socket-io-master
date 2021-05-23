import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { Navigate, useRoutes } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles'
import DashboardLayout from './components/DashboardLayout'
import theme from './theme'
import Login from './components/public/Login';
import Logout from './components/Logout';

const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <div>Dashboard page</div> },
      { path: 'servers', element: <div>Servers Page</div> },
      { path: 'servers/:id', element: <div>Server Detail Page</div> },
      { path: 'matches', element: <div>Matches Page</div> },
      { path: 'matches/:id', element: <div>Match Detailed Page:</div> },
      { path: 'geo', element: <div>Geo Page</div> },
      { path: 'plan', element: <div>Schedule Page</div> },
      { path: 'users', element: <div>Users Page</div> },
      { path: 'account', element: <div>Account Page</div> },
      { path: 'alerts', element: <div>Alerts Page</div> },
      { path: 'notifications', element: <div>Alerts Page</div> },
      { path: '/', element: <Navigate to="/dashboard" /> },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/logout",
    element: <Logout />
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
