import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import DetailPage from '@/pages/DetailPage';
import AddPage from '@/pages/AddPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/note/:id" element={<DetailPage />} />
          <Route path="/add" element={<AddPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
