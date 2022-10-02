import "./App.css";
import Navbar from "./compnents/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./compnents/HomePage";
import LoginPage from "./compnents/LoginPage";

const App = () => (
  <div className='App'>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
