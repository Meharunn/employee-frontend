import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from "./pages/ContactForm";
import EmployeeTable from "./pages/EmployeeTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/employees" element={<EmployeeTable />} />
      </Routes>
    </Router>
  );
}

export default App;