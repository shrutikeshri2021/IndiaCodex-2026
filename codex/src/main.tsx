import React from 'react';
import ReactDOM from 'react-dom/client';
import { MeshProvider } from '@meshsdk/react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MeshProvider>
      <App />
    </MeshProvider>
  </React.StrictMode>,
);