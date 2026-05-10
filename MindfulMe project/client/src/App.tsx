import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MoodPage from './pages/MoodPage';
import JournalPage from './pages/JournalPage';
import ProgressPage from './pages/ProgressPage';
import NavBar from './components/NavBar';
import UserList from './components/admin/UserList';
import FlaggedEntries from './components/admin/FlaggedEntries';
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/flagged" element={<FlaggedEntries />} />
        
      </Routes>
    </Router>
  );
};

export default App;
