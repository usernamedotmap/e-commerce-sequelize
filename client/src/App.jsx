import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/signsup";
import Login from "./components/login";
import Home from "./components/Home";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="signup" />} />
        <Route path="/signup" element={< Signup/>} />
        <Route path="/login" element={< Login />} />
        <Route path="/home" element={< Home />} />
      </Routes>
    </Router>
  );
};

export default App;
