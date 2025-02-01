import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import AddTache from "./AddTache";
import ListTaches from "./ListTaches";
import UpdateTache from "./UpdateTache";

const App = () => {   
  return (
    <Router> {/* Wrap Routes inside Router */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/add" element={<AddTache />} />
        <Route path="/tasks" element={<ListTaches utilisateurId="userId" />} />
        <Route path="/update/:id" element={<UpdateTache />} />
      </Routes>
    </Router>
  );
};

export default App;
