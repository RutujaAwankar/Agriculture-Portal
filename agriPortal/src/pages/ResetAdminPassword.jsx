import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ResetAdminPassword() {
  const navigate = useNavigate();
  
  // State to handle the form fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    if (!oldPassword || !newPassword) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:5274/admin/change-password',
        { oldPassword, newPassword },
        {
          headers: {
            'Authorization': token,
          },
        }
      );

      // Handle success response
      setSuccessMessage(response.data.message || 'Password successfully changed.');
      setErrorMessage('');
      setOldPassword('');
      setNewPassword('');
      navigate("/admin/dashboard")
    } catch (error) {
      // Handle error response
      setErrorMessage(error.response?.data?.message || 'Password change failed.');
      setSuccessMessage('');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-semibold text-white mb-4">Reset Password</h2>
        
        {errorMessage && <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>}
        {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2" htmlFor="oldPassword">Old Password</label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
              placeholder="Enter old password"
              required
            />
          </div>

          <div>
            <label className="text-white block mb-2" htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white"
              placeholder="Enter new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg mt-4 hover:bg-indigo-700 transition"
          >
            Change Password
          </button>
        </form>
        <button
            type="button"
            onClick={handleBackToDashboard}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition mt-5"
          >
            ← Back to Dashboard
          </button>
      </div>
    </div>
  );
}
