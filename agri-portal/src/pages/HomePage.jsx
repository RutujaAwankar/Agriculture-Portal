import { Link } from 'react-router-dom';
import FeaturedCard from "../components/common/FeatureCard";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const HomePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 space-y-8">
          <FeaturedCard />
          {/* Add more content sections here */}
        </main>
      </div>

      <Footer className="ml-64" />
    </div>
  );
};
//need to add more in this place
const Sidebar = () => {
  const sidebarItems = [
    { name: 'Recent News', link: 'https://agriwelfare.gov.in/en/Recent' },
    { name: 'Weather', link: 'https://www.google.com/search?client=firefox-b-d&q=Current+weather' },
    { name: 'Technologies', link: '/technologies' },
    { name: 'Schemes', link: '/schemes' },
    { name: 'Services', link: '/services' }
  ];

  return (
    <aside 
      className="fixed left-0 top-16 h-full w-64 bg-gray-900 border-r border-gray-700 p-6 space-y-8"
      aria-label="Sidebar navigation"
    >
      <nav>
        <h2 className="sr-only">Main Navigation</h2>
        <ul className="space-y-4">
          {sidebarItems.map(({ name, link }) => (
            <li key={name}>
              <Link
                to={link}
                className="text-gray-300 text-sm hover:text-white transition-colors block p-2 rounded hover:bg-gray-800"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <SalesPortalSection />
    </aside>
  );
};


const SalesPortalSection = () => {
  return (
    <section aria-labelledby="sales-portal-heading">
      <h3 id="sales-portal-heading" className="text-white text-lg font-medium mb-4">
        Sales Portal
      </h3>
      <div className="space-y-3">
        <button 
          className="w-full py-2 bg-gray-600 text-white rounded text-sm font-medium
                     hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2
                     focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Buy agricultural products"
        >
          BUY
        </button>
        <button 
          className="w-full py-2 bg-gray-600 text-white rounded text-sm font-medium
                     hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2
                     focus:ring-emerald-500 focus:ring-offset-2"
          aria-label="Sell agricultural products"
        >
          SELL
        </button>
      </div>
    </section>
  );
};

const AdminSection = () =>{
  return(
    <button 
          className="w-full py-2 bg-white text-gray rounded text-sm font-medium
                     hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus:ring-2
                     focus:ring-gray-900 focus:ring-offset-2"
        >
          <Link to='/adminlogin'>Administrator Login</Link>
        </button>
  )
}

export default HomePage;