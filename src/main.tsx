import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import DownloadReport from './components/DownloadReport.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/download" element={<DownloadReport />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>
);
