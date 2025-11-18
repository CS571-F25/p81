import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../pages/Home.jsx';
import App from '../../App.jsx';
import BadgerlyAdvice from '../BadgerlyAdvice.jsx';
import Contact from '../pages/Contact.jsx';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/p81/' element={<BadgerlyAdvice />}>
          <Route index element={<Home />} />
          <Route path='about' element={<App />} />
          <Route path='contact' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
