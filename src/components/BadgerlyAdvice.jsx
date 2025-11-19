import { Outlet } from 'react-router';
import BadgerNavbar from './structural/BadgerNavbar.jsx';
import { Container } from 'react-bootstrap';
import './BadgerlyAdvice.css';

export default function BadgerlyAdvice() {
  return (
    <div className='badgerly-container'>
      <BadgerNavbar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
