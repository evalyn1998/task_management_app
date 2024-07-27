import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" Component={Register} />
                <Route path="/" Component={Login} />
            </Routes>
            <ToastContainer
                autoClose={1000}
                closeButton={true}
                hideProgressBar={true}
            />
        </Router>
    );
}

export default App;
