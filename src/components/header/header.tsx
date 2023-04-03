import Link from 'next/link';
import React from 'react';
import Logo from './logo';
import { RxCross2 } from 'react-icons/rx';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  closeSidebar,
  openSidebar,
  selectSidebarOpen,
} from '@/slice/sidebar.slice';
import SearchBar from './searchBar';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const sideBarOpen = useAppSelector(selectSidebarOpen);
  return (
    <div className="padding-x from-pinkAccent fixed top-0 z-30 flex w-full flex-col gap-2 border-b-2 border-black bg-gradient-to-r to-white py-2">
      <div className="flex items-center justify-between">
        <div className="md:hidden">
          {sideBarOpen ? (
            <RxCross2
              className="text-2xl"
              onClick={() => dispatch(closeSidebar())}
            />
          ) : (
            <BiMenuAltRight
              className="text-2xl"
              onClick={() => dispatch(openSidebar())}
            />
          )}
        </div>
        <Logo classname="aspect-square w-12" />
        <SearchBar classname="max-md:hidden max-w-sm" />
        <div className="flex gap-3">
          <Link href="/wishtlist">
            <div className="relative">
              <AiOutlineHeart className="h-6 w-6" />
              <div className="bg-pinkAccent absolute right-0 top-0 grid h-5 w-5 -translate-y-2 translate-x-1/2 place-content-center rounded-full text-white">
                0
              </div>
            </div>
          </Link>
          <Link href="/user/login">
            <HiOutlineUserCircle className="h-6 w-6" />
          </Link>
        </div>
      </div>
      <SearchBar classname="md:hidden" />
    </div>
  );
};

export default Header;
