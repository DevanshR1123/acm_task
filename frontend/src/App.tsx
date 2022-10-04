import { useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RequireAuth from "./utils/RequireAuth";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              element={
                <RequireAuth redirectTo='/login'>
                  <HomePage />
                </RequireAuth>
              }
              path='/'
            />
            <Route element={<LoginPage />} path='/login' />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
