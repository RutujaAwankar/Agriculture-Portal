import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SunIcon,
  ScaleIcon,
  HandRaisedIcon,
  UserGroupIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const categories = [
  {
    name: 'agriculture',
    icon: SunIcon,
    label: 'AGRICULTURE',
  },
  { 
    name: 'fishery',
    icon: ScaleIcon,
    label: 'FISHERY',
  },
  {
    name: 'organic-farming',
    icon: HandRaisedIcon,
    label: 'ORGANIC FARMING',
  },
  {
    name: 'animal-husbandry',
    icon: UserGroupIcon,
    label: 'ANIMAL HUSBANDRY',
  },
  {
    name: 'horticulture',
    icon: ChartPieIcon,
    label: 'HORTICULTURE',
  },
];

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    // Navigate to selected category page
    navigate(`/categories/${categoryName}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-gray-900 flex flex-grow items-center justify-center py-8 w-full">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl text-white mb-8 font-bold">
      Select Farming Category
    </h2>
    <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <button
            key={category.name}
            onClick={() => handleCategorySelect(category.name)}
            className="group flex flex-col items-center transition-all duration-200 ease-in-out"
          >
            <div className="p-2 bg-white rounded-full mb-2 transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
              <IconComponent className="w-8 h-8 text-slate-900" />
            </div>
            <span className="text-white uppercase text-sm font-medium tracking-wide text-center transition-colors duration-200 ease-in-out group-hover:text-emerald-500">
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  </div>
</div>


      <Footer />
    </div>
  );
}