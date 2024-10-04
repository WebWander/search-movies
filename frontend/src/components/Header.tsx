import React from 'react';
import logo from '../assets/logo.png';
import { HiHome, HiStar, HiPlayCircle, HiTv, HiMagnifyingGlass } from 'react-icons/hi2';
import HeaderItem from './HeaderItem';
import { Avatar } from 'primereact/avatar';
// Define the shape of the menu items
interface MenuItem {
  name: string;
  icon: React.ComponentType; // Type for React icons
}

export default function Header() {
  // Define the menu array with explicit typing
  const menu: MenuItem[] = [
    {
      name: 'HOME',
      icon: HiHome,
    },
    {
      name: 'SEARCH',
      icon: HiMagnifyingGlass,
    },
    {
      name: 'MY LIST',
      icon: HiStar,
    },
    {
      name: 'CATEGORIES',
      icon: HiPlayCircle,
    },
    {
      name: 'SERIES',
      icon: HiTv,
    },
  ];

  return (
    <div className='flex items-center justify-between p-5'>
      <div className='flex gap-8 items-center'> 
        <div className='hidden md:flex gap-8'>
          {menu.map((item, index) => (
            <HeaderItem key={index} name={item.name} Icon={item.icon} />
          ))}
        </div>
        <div className='flex md:hidden gap-8'>
          {menu.map((item, index) => index<4&&(
            <HeaderItem key={index} name={item.name} Icon={item.icon} />
          ))}
        </div>
        <Avatar label="M" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle"  />
      </div>
    </div>
  );
}
