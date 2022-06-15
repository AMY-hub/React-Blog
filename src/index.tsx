import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App/App';

import './styles/main.scss';
import './styles/reset.scss';

import "typeface-roboto";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
