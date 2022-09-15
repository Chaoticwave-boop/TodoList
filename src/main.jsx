import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { StyledEngineProvider } from '@mui/material/styles';





ReactDOM.render(
  <StyledEngineProvider>
    <App />
  </StyledEngineProvider>, 
  document.getElementById('root')
);
