import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import FarmerLogin from './pages/FarmerLogin';
import FarmerSignup from './pages/FarmerSignup';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminRegister';
import LearnPage from './pages/LearnPage'
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import ResetAdminPassword from './pages/ResetAdminPassword';
import AdminUpdate from './pages/AdminUpdate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/login" element={<FarmerLogin/>}/>
        <Route path="/signup" element={<FarmerSignup/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/adminregister" element={<AdminSignup/>}/>
        <Route path="/learn" element={<LearnPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/reset-password' element={<ResetAdminPassword/>}/>
        <Route path='/admin/update' element={<AdminUpdate/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
