import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../../pages/Home';
import App from '../../App.jsx';
import BadgerlyAdvice from '../BadgerlyAdvice.jsx';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/p81/' element={<BadgerlyAdvice />}>
          <Route index element={<Home />} />
          <Route path='about' element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
