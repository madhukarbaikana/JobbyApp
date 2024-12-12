import React, { Suspense } from "react"
import { Routes, Route, Navigate } from 'react-router-dom';


import Login from './componets/Login'; 
import Home from './componets/Home';   

import JobDetails from './componets/JobDetails'; 
import ProtectedRoute from './componets/ProtectedRoute'; 
import NotFound from './componets/NotFound'; 

import './App.css';

const LazyJobs=React.lazy(()=>import("./componets/Jobs"))

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/jobs" element={<ProtectedRoute>
      <Suspense fallback={<div>Loading......</div>}><LazyJobs /></Suspense>
      </ProtectedRoute>} />
    <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/not-found" />} />
  </Routes>
);

export default App;
