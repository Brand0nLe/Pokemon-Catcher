
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <div>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </div>
      </div>
      <div className='footer'></div>
    </Router>
  );
}

export default App;
