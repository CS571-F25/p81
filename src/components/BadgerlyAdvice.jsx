import { Outlet } from 'react-router';
import BadgerNavbar from './structural/BadgerNavbar.jsx';
export default function BadgerlyAdvice() {
  return (
    <div>
      <BadgerNavbar />
      <div style={{ margin: '1rem' }}>
        <Outlet />
      </div>
    </div>
  );
}
