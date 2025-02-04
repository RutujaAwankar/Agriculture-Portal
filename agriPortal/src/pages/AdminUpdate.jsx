import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
  // State to manage form fields and messages
  const [adminDetails, setAdminDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });
  const [originalAdminDetails, setOriginalAdminDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch admin details on component load
  useEffect(() => {
    fetchAdminDetails();
  }, []);

  // Fetch admin details from the backend
  const fetchAdminDetails = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5274/admin/get-admin', {
        headers: {
          'Authorization': token
        }
      });

      // Update state with fetched admin details
      const { admin } = response.data;
      const details = {
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        mobile: admin.mobile
      };
      setEditMode(true);
      
      // Store both current and original details
      setAdminDetails(details);
      setOriginalAdminDetails(details);
    } catch (error) {
      setErrorMessage(error.response?.data?.Message || 'Failed to fetch admin details');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(
        'http://localhost:5274/admin/update-profile', 
        {
          firstName: adminDetails.firstName,
          lastName: adminDetails.lastName,
          email: adminDetails.email,
          mobile: adminDetails.mobile
        },
        {
          headers: {
            'Authorization': token
          }
        }
      );

      // Handle successful update
      setSuccessMessage(response.data.Message || 'Profile updated successfully');
      
      // Update original details to match new details
      setOriginalAdminDetails(adminDetails);
      setEditMode(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.Message || 'Profile update failed');
    }
  };

  // Cancel editing and revert to original details
  const handleCancelEdit = () => {
    setAdminDetails(originalAdminDetails);
    setEditMode(false);
    setErrorMessage(''); // Clear any previous error messages
    setSuccessMessage(''); // Clear any previous success messages
  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        
      <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full">
        
        <h2 className="text-2xl font-semibold text-white mb-4">Admin Profile</h2>
        {/* Error and Success Messages */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500 text-white p-2 rounded mb-4">
            {successMessage}
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="text-white block mb-2" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={adminDetails.firstName}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full p-3 rounded-lg bg-gray-700 text-white 
                ${editMode ? 'border border-indigo-500' : 'cursor-not-allowed opacity-50'}`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-white block mb-2" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={adminDetails.lastName}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full p-3 rounded-lg bg-gray-700 text-white 
                ${editMode ? 'border border-indigo-500' : 'cursor-not-allowed opacity-50'}`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white block mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={adminDetails.email}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full p-3 rounded-lg bg-gray-700 text-white 
                ${editMode ? 'border border-indigo-500' : 'cursor-not-allowed opacity-50'}`}
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="text-white block mb-2" htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={adminDetails.mobile}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full p-3 rounded-lg bg-gray-700 text-white 
                ${editMode ? 'border border-indigo-500' : 'cursor-not-allowed opacity-50'}`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel
                </button>
                
              </>
            )}
          </div>
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