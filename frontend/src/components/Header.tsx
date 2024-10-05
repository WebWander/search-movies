import React from 'react';
import { HiHome, HiStar, HiPlayCircle, HiTv, HiMagnifyingGlass } from 'react-icons/hi2';
import HeaderItem from './HeaderItem';
import { Avatar } from 'primereact/avatar';

interface MenuItem {
  name: string;
  icon: React.ComponentType; // Type for React icons
}

export default function Header() {
  const menu: MenuItem[] = [
    { name: 'HOME', icon: HiHome },
    { name: 'SEARCH', icon: HiMagnifyingGlass },
    { name: 'MY LIST', icon: HiStar },
    { name: 'CATEGORIES', icon: HiPlayCircle },
    { name: 'SERIES', icon: HiTv },
  ];

  return (
    <div className="flex items-center justify-between p-4 md:p-5">
      {/* Logo or Menu Items */}
      <div className="flex gap-4 md:gap-8 items-center">
        {/* Desktop Menu - Visible only on medium screens and up */}
        <div className="hidden md:flex gap-8">
          {menu.map((item, index) => (
            <HeaderItem key={index} name={item.name} Icon={item.icon} />
          ))}
        </div>

        {/* Mobile Menu - Visible only on small screens */}
        <div className="flex md:hidden gap-4">
          {menu.slice(0, 3).map((item, index) => (
            <HeaderItem key={index} name={item.name} Icon={item.icon} />
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div className="flex-shrink-0 pl-5 ">
        <Avatar label="M" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
      </div>
    </div>
  );
}
