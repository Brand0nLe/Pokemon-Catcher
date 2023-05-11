import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
