import { HashRouter, Routes, Route } from 'react-router';
import RootLayout from './layout/RootLayout';
import Home from './views/Home';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Home />} />
          <Route path='/stat' element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
