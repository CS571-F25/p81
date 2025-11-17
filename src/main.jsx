import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router';
import Router from './components/structural/Router.jsx';

createRoot(document.getElementById('root')).render(<Router />);
