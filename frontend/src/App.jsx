import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminList from './pages/AdminList';
import FormPage from './pages/FormPage';

const Home = () => (
  <div className="home">
    <h1>EMPLOYEE FORM</h1>
    <Link to="/admins-list">
      <button>ADMIN'S LIST</button>
    </Link>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admins-list" element={<AdminList />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  </Router>
);

export default App;
