import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { 
  UserGroupIcon,
  ChartBarSquareIcon,
  CubeIcon,
  Squares2X2Icon,
  UserCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const dashboardItems = [
    { title: 'All Users', path: '/admin/users', icon: UserGroupIcon, color: 'bg-purple-500' },
    { title: 'Users Analytics', path: '/admin/users-by-farming', icon: ChartBarSquareIcon, color: 'bg-emerald-500' },
    { title: 'All Products', path: '/admin/all-products', icon: CubeIcon, color: 'bg-cyan-500' },
    { title: 'Products Analytics', path: '/admin/products-by-farming', icon: Squares2X2Icon, color: 'bg-amber-500' },
    { title: 'Update Profile', path: '/admin/update', icon: UserCircleIcon, color: 'bg-pink-500' },
    { title: 'Reset Password', path: '/admin/reset-password', icon: ArrowPathIcon, color: 'bg-rose-500' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/adminlogin');
  };

  return (
    <div className="min-h-screen bg-gray-900">
        <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="group relative text-white cursor-pointer rounded-xl bg-gray-800 p-6 transition-all duration-300 
                hover:bg-white hover:text-gray-900"
              >
                <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className=" text-sm">
                  Manage and analyze {item.title.toLowerCase().includes('analytics') ? 'statistics' : 'records'}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-red-500 transition-colors 
            group hover:shadow-lg"
          >
            <span className="text-gray-300 group-hover:text-white font-medium">Logout</span>
          </button>
        </div>
      </div>
  );
}