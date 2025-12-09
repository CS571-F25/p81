import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router';
import Router from './components/structural/Router.jsx';

createRoot(document.getElementById('root')).render(<Router />);
