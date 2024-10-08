import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './componets/Login'; // Fixed typo
import Home from './componets/Home';   // Fixed typo
import Jobs from './componets/Jobs';    // Fixed typo
import JobDetails from './componets/JobDetails'; // Fixed typo
import ProtectedRoute from './componets/ProtectedRoute'; // Fixed typo
import NotFound from './componets/NotFound'; // Fixed typo

import './App.css';

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
    <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/not-found" />} />
  </Routes>
);

export default App;
