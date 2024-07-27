import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Kanban from './components/Kanban';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import "./css/app.css"

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/register" Component={Register} />
                    <Route path="/" Component={Login} />
                    <Route path="/kanban" element={<ProtectedRoute Component={Kanban} />} /> 
                </Routes>
                <ToastContainer
                    autoClose={2000}
                    closeButton={true}
                    hideProgressBar={true}
                />
            </Router>
        </AuthProvider>
    );
}

export default App;
