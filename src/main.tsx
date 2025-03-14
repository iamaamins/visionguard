import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@fontsource-variable/hanken-grotesk';

const root = createRoot(document.body);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
