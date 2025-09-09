import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import logo from '../../assets/logo/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setSearch('');
      }
    }
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  const handleSearch = () => {
    const query = search.trim().toLowerCase();
    if (query.includes('pant') || query.includes('pants')) {
      navigate('/productDetails/pant');
    } else if (query.includes('tshirt') || query.includes('tshirts')) {
      navigate('/productDetails/tshirt');
    } else if (query.includes('shirt') || query.includes('shirts')) {
      navigate('/productDetails/shirt');
    } else if (query.includes('sock') || query.includes('socks')) {
      navigate('/productDetails/socks');
    } else if (query.includes('cap') || query.includes('caps')) {
      navigate('/productDetails/cap');
    } else if (query.includes('bag') || query.includes('bags')) {
      navigate('/productDetails/bag');
    } else if (query.includes('benie') || query.includes('benies')) {
      navigate('/productDetails/benies');
    } else {
      toast.error(`No products found like ${search}`);
    }
    setShowSearch(false);
    setSearch('');
  };

  return (
    <>
      <div className='bg-black text-white flex px-[10px] md:px-[20px] py-[8px] md:py-[16px] items-center justify-between'>
        <div className='flex gap-4 md:gap-10 items-center'>
          <button className='md:hidden text-[24px]' onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </button>
          <div className='h-[36px] md:h-[50px] rounded-[2px] md:rounded-[6px] overflow-hidden'>
            <img src={logo} className='h-[36px] md:h-[50px]' alt="logo" />
          </div>
          <div className='hidden md:flex gap-[20px] md:gap-[24px] text-[14px] md:text-[19px]'>
            <Link className='cursor-pointer'>Style</Link>
            <Link className='cursor-pointer'>Gender</Link>
            <Link className='cursor-pointer'>Fabric</Link>
            <Link className='cursor-pointer'>Composition</Link>
            <Link className='cursor-pointer'>Filters</Link>
          </div>
        </div>
        <div className=" flex items-center" ref={wrapperRef}>
          {!showSearch && (
            <FaSearch
              className='text-[20px] md:text-[24px] cursor-pointer'
              onClick={() => setShowSearch(true)}
            />
          )}
          {showSearch && (
            <div className={`flex bg-white rounded-2xl border border-gray-300 transition-all duration-75 ease-in-out
            ${showSearch ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 w-0'}
            overflow-hidden`}
            >
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Search..."
                className=" outline-none text-black px-3 w-[200px] md:w-[300px]"
                style={{ zIndex: 10 }}
              />
              <button
                onClick={handleSearch}
                className=" text-black text-2xl md:text-3xl cursor-pointer"
              >
                <FaArrowCircleRight />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-gradient-to-b from-white to-zinc-100 z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} rounded-r-2xl`}
      >
        <div className='flex items-center justify-between px-4 py-4 border-b border-zinc-200'>
          <div className='flex items-center gap-2'>
            <div className='h-[36px] rounded-[6px] overflow-hidden ring-1 ring-zinc-200'>
              <img src={logo} className='h-[36px]' alt="logo" />
            </div>
          </div>
          <button
            className='text-zinc-700 hover:text-black text-[22px] active:scale-95 transition-transform'
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <div className='flex flex-col px-3 py-4 text-black'>
          <Link className='cursor-pointer px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors' onClick={() => setIsSidebarOpen(false)}>Style</Link>
          <Link className='cursor-pointer px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors' onClick={() => setIsSidebarOpen(false)}>Gender</Link>
          <Link className='cursor-pointer px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors' onClick={() => setIsSidebarOpen(false)}>Fabric</Link>
          <Link className='cursor-pointer px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors' onClick={() => setIsSidebarOpen(false)}>Composition</Link>
          <Link className='cursor-pointer px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors' onClick={() => setIsSidebarOpen(false)}>Filters</Link>
        </div>
      </div>
    </>
  )
}

export default Header