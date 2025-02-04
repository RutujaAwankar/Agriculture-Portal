import { useState } from 'react';
import Header from '../components/common/Header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:8081/users/signin',
          formData
        );
        
        // Save JWT token to localStorage
        localStorage.setItem('userToken', response.data.jwt);
        
        // Redirect to home page or dashboard
        navigate('/');
      } catch (error) {
        if (error.response) {
          setErrors({
            ...errors,
            server: error.response.data.message || 'Login failed',
          });
        } else {
          setErrors({
            ...errors,
            server: 'An error occurred. Please try again.',
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex items-center justify-center">
      <Header />
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Farmer Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              } focus:ring-blue-400 focus:border-blue-400`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              } focus:ring-blue-400 focus:border-blue-400`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          
          {errors.server && (
            <p className="text-red-400 text-sm mt-1 text-center">{errors.server}</p>
          )}

          <Link to='/forgot' className="block text-gray-300 mt-5 hover:text-white transition-all">
            Forgot Password?
          </Link>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-all"
          >
            Sign In
          </button>
        </form>
        
        <label className="block text-gray-400 mt-5">
          Don't have an account?{' '}
          <Link to='/signup' className="text-gray-300 hover:text-white transition-all">
            Sign Up
          </Link>
        </label>
      </div>
    </div>
  );
}