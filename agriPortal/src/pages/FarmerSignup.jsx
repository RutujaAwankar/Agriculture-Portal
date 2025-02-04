import { useState } from 'react';
import axios from 'axios';
import Header from '../components/common/Header';
import {useNavigate} from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    city: '',
    state: '',
    adrLine1: '',
    adrLine2: '',
    zipCode: '',
    role: '',
    farmingType: '',
    image: null
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Configuration for dropdown options
  const states = ['Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'Uttar Pradesh'];
  const roles = [
    { display: 'Farmer', value: 'ROLE_FARMER' },
    { display: 'Merchant', value: 'ROLE_MERCHANT' }
  ];
  const farmingTypes = [
    { display: 'Horticulture', value: 'HORTICULTURE' },
    { display: 'Dairy Farming', value: 'DAIRY' },
    { display: 'Poultry Farming', value: 'POULTRY' },
    { display: 'Crop Farming', value: 'CROPS' },
    { display: 'Organic Farming', value: 'ORGANIC' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.adrLine1) newErrors.adrLine1 = 'Address Line 1 is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip Code is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.farmingType) newErrors.farmingType = 'Farming Type is required';
    if (!formData.image) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        mobile: formData.phone,
        gender: formData.gender.toUpperCase(),
        adrLine1: formData.adrLine1,
        adrLine2: formData.adrLine2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        role: formData.role,
        farmingType: formData.farmingType
      };

      const formDataToSend = new FormData();
      formDataToSend.append('user', JSON.stringify(userData));
      formDataToSend.append('image', formData.image);

      const response = await axios.post(
        'http://localhost:8081/users/signup',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Registration successful:', response.data);
      navigate('/login');

      // Handle successful registration
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center justify-center">
      <Header />
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg mt-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Farmer Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">First Name *</label>
              <input
                type="text"
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.firstName ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Last Name *</label>
              <input
                type="text"
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.lastName ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Contact Fields */}
          <div>
            <label className="block text-gray-400 mb-2">Phone Number *</label>
            <input
              type="tel"
              className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                errors.phone ? 'border-red-500' : 'border-gray-600'
              } focus:ring-blue-400 focus:border-blue-400`}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-blue-400 focus:border-blue-400"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Password *</label>
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

            <div>
              <label className="block text-gray-400 mb-2">Confirm Password *</label>
              <input
                type="password"
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>


          {/* Gender and City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Gender *</label>
              <select
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.gender ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">City *</label>
              <input
                type="text"
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.city ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>

          {/* State and Zip Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">State *</label>
              <select
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.state ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Zip Code *</label>
              <input
                type="text"
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              />
              {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          {/* Address Lines */}
          <div>
            <label className="block text-gray-400 mb-2">Address Line 1 *</label>
            <input
              type="text"
              className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                errors.adrLine1 ? 'border-red-500' : 'border-gray-600'
              } focus:ring-blue-400 focus:border-blue-400`}
              value={formData.adrLine1}
              onChange={(e) => setFormData({ ...formData, adrLine1: e.target.value })}
            />
            {errors.adrLine1 && <p className="text-red-400 text-sm mt-1">{errors.adrLine1}</p>}
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Address Line 2</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-blue-400 focus:border-blue-400"
              value={formData.adrLine2}
              onChange={(e) => setFormData({ ...formData, adrLine2: e.target.value })}
            />
          </div>

          {/* Role and Farming Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Role *</label>
              <select
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.role ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>{role.display}</option>
                ))}
              </select>
              {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Farming Type *</label>
              <select
                className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                  errors.farmingType ? 'border-red-500' : 'border-gray-600'
                } focus:ring-blue-400 focus:border-blue-400`}
                value={formData.farmingType}
                onChange={(e) => setFormData({ ...formData, farmingType: e.target.value })}
              >
                <option value="">Select Farming Type</option>
                {farmingTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.display}</option>
                ))}
              </select>
              {errors.farmingType && <p className="text-red-400 text-sm mt-1">{errors.farmingType}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-400 mb-2">Profile Image *</label>
            <input
              type="file"
              accept="image/*"
              className={`w-full p-2 bg-gray-700 text-white border rounded-lg ${
                errors.image ? 'border-red-500' : 'border-gray-600'
              } focus:ring-blue-400 focus:border-blue-400`}
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
            {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-all">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}