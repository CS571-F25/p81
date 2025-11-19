import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../../pages/Home';
import About from '../../pages/About.jsx';
import BadgerlyAdvice from '../BadgerlyAdvice.jsx';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/p81/' element={<BadgerlyAdvice />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
