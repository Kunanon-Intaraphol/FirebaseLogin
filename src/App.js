import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Contact from "./components/Contact";
import AI from "./components/AI";
// import "./app.css";
// import './components/Contact.js'

function App() {
    return (
    <Router>
        <Routes>
            <Route path="/" element = {<Contact />} />
            {/* <Route path="/Contact" element = {<Contact />} /> */}
            <Route path="/AI" element = {<AI />} />
        </Routes>
    </Router>
    );
    
}

export default App;