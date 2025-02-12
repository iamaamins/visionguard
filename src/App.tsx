import { HashRouter, Routes, Route } from 'react-router';
import RootLayout from './layout/RootLayout';
import Home from './views/Home';
import Processes from './views/Processes';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/processes' element={<Processes />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
