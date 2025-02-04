import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Header from '../components/common/Header';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5274/admin/login', formData);
      if (response.data.token) {
        localStorage.setItem('adminToken',"Bearer "+response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        setLoginError(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // The request was made but no response was received
        setLoginError('Network error. Please try again.');
      } else {
        // Something happened in setting up the request
        setLoginError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Header />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Admin Login
        </h1>
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className={`w-full p-3 border rounded-lg ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className={`w-full p-3 border rounded-lg ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <Link to='/forgot' className="block text-gray-500 mt-5 hover:text-gray-900 transition-all">Forgot Password? </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <label className="block text-gray-400 mt-5">Register a new admin <Link to='/adminregister' className="text-gray-500 hover:text-gray-900 transition-all">here</Link></label>
    </div>
  );
}