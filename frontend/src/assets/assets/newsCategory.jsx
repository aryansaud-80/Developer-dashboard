import {
  ZapIcon,
  Smartphone,
  Shield,
  Code,
  Cpu,
  Globe,
  Cloud,
} from 'lucide-react';

const newsCategory = [
  {
    id: 0,
    name: 'All',
    icon: <Globe className='text-gray-500' />,
  },
  {
    id: 1,
    name: 'AI/ML',
    icon: <ZapIcon className='text-gray-500' />,
  },
  {
    id: 2,
    name: 'Web Development',
    icon: <Code className='text-gray-500' />,
  },
  {
    id: 3,
    name: 'Cybersecurity',
    icon: <Shield className='text-gray-500' />,
  },
  {
    id: 4,
    name: 'Mobile Development',
    icon: <Smartphone className='text-gray-500' />,
  },
  {
    id: 4,
    name: 'Cloud Computing',
    icon: <Cloud className='text-gray-500' />,
  },

  {
    id: 5,
    name: 'Hardware',
    icon: <Cpu className='text-gray-500' />,
  },
];

export default newsCategory;
