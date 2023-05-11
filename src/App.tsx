import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          {routes.map((route, index) => (
            <Route key={index} path={route.path} Component={route.Component} />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;
