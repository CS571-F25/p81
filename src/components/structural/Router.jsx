import { BrowserRouter, Route, Routes } from 'react-router';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import BadgerlyAdvice from '../BadgerlyAdvice.jsx';
import Contact from '../pages/Contact.jsx';
import DormLottery from '../pages/DormLottery.jsx';
import BadgerSnacks from '../pages/BadgerSnacks.jsx';
import BadgerStudy from '../pages/BadgerStudy.jsx';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/p81/' element={<BadgerlyAdvice />}>
          <Route index element={<Home />} />
          <Route path='dormLottery' element={<DormLottery />} />
          <Route path='study-snacks' element={<BadgerSnacks />} />
          <Route path='study-spots' element={<BadgerStudy />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
