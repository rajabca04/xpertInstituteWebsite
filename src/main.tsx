import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import AdminLayout from './components/Admin/AdminLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin-dashbord" element={<AdminLayout />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>
);
