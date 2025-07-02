import {
  TrendingUp,
  ZapIcon,
  Smartphone,
  Rocket,
  Shield,
  Code,
  Cpu,
  Globe,
} from 'lucide-react';

const newsCategory = [
  {
    id: 0,
    name: 'All News',
    icon: <Globe className='text-gray-500' />,
  },

  {
    id: 1,
    name: 'Trending',
    icon: <TrendingUp className='text-gray-500' />,
  },
  {
    id: 2,
    name: 'AI & ML',
    icon: <ZapIcon className='text-gray-500' />,
  },
  {
    id: 3,
    name: 'Mobile',
    icon: <Smartphone className='text-gray-500' />,
  },
  {
    id: 4,
    name: 'Startups',
    icon: <Rocket className='text-gray-500' />,
  },
  {
    id: 5,
    name: 'Security',
    icon: <Shield className='text-gray-500' />,
  },
  {
    id: 6,
    name: 'Web Dev',
    icon: <Code className='text-gray-500' />,
  },
  {
    id: 7,
    name: 'Hardware',
    icon: <Cpu className='text-gray-500' />,
  },
];

export default newsCategory;
