import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './src/route/routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route path={path} element={<Component />}  />
        ))}
      </Routes>
    </Router>
  );
};

export default App;

