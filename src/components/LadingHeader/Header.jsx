import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import logo from '../../assets/logo/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaArrowCircleRight, FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const downloads = {
  en: [
    { name: 'Master Catalogue', filename: '/docs/en/EN_Master_catalog.pdf' },
    { name: 'T-Shirts', filename: '/docs/en/EN_Tshirts_catalog.pdf' },
    { name: 'Beanie and Caps', filename: '/docs/en/EN_Beanie_and_Caps_catalog.pdf' },
    { name: 'Bedsheets', filename: '/docs/en/EN_Bedsheets_catalog.pdf' },
    { name: 'Hoodies', filename: '/docs/en/EN_Hoodies_catalog.pdf' },
    { name: 'Shorts and Pants', filename: '/docs/en/EN_Shorts_and_Pants_catalog.pdf' },
    { name: 'Socks', filename: '/docs/en/EN_Socks_Catalog.pdf' },
  ],
  de: [
    { name: 'Hauptkatalog', filename: '/docs/de/DE_Master_catalog.pdf' },
    { name: 'T-Shirts', filename: '/docs/de/DE_Tshirts_catalog.pdf' },
    { name: 'Beanie und Caps', filename: '/docs/de/DE_Beanies_and_Caps_catalog.pdf' },
    { name: 'Bettwäsche', filename: '/docs/de/DE_Bedsheets_catalog.pdf' },
    { name: 'Kapuzenpullis', filename: '/docs/de/DE_Hoodies_catalog.pdf' },
    { name: 'Shorts und Hosen', filename: '/docs/de/DE_Shorts_and_Pants_catalog.pdf' },
    { name: 'Socken', filename: '/docs/de/DE_Socks_catalog.pdf' },
  ]
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = (i18n.language || 'en').slice(0, 2);

  // Search state
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  // Desktop catalogue dropdown
  const [showCatalogue, setShowCatalogue] = useState(false);
  const catalogueRef = useRef(null);

  // Mobile menu + catalogue accordion
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatalogueOpen, setMobileCatalogueOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // wrapperRef used for search outside click
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) inputRef.current.focus();
  }, [showSearch]);

  // Close dropdowns/menus/search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearch('');
      }
      if (catalogueRef.current && !catalogueRef.current.contains(event.target)) {
        setShowCatalogue(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && mobileOpen) {
        setMobileOpen(false);
        setMobileCatalogueOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  // Escape to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowCatalogue(false);
        setMobileOpen(false);
        setMobileCatalogueOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleSearch = () => {
    const query = search.trim().toLowerCase();
    if (!query) {
      toast.error('Please enter a search term');
      return;
    }
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
      toast.error(`No products found like "${search}"`);
    }
    setShowSearch(false);
    setSearch('');
  };

  const catalogueItems = downloads[currentLang] || downloads['en'] || [];

  return (
    <>
      {/* TOP BAR */}
      <div className='bg-black text-white flex px-[10px] md:px-[20px] py-[8px] md:py-[16px] items-center justify-between'>
        {/* Left: logo + nav (desktop) */}
        <div className='flex gap-4 md:gap-10 items-center'>
          <div className='h-[36px] md:h-[50px] rounded-[2px] md:rounded-[6px] overflow-hidden'>
            <img src={logo} className='h-[36px] md:h-[50px]' alt="logo" />
          </div>

          {/* Desktop nav */}
          <div className='hidden md:flex gap-[20px] md:gap-[24px] text-[14px] md:text-[19px] items-center'>
            <Link className='cursor-pointer'>{t('ladingheader_header_Style')}</Link>
            <Link className='cursor-pointer'>{t('ladingheader_header_Gender')}</Link>
            <Link className='cursor-pointer'>{t('ladingheader_header_Fabric')}</Link>
            <Link className='cursor-pointer'>{t('ladingheader_header_Composition')}</Link>
            <Link className='cursor-pointer'>{t('ladingheader_header_Filters')}</Link>

            {/* Catalogue desktop dropdown */}
            <div className='relative' ref={catalogueRef}>
              <button
                aria-haspopup="true"
                aria-expanded={showCatalogue}
                onClick={() => setShowCatalogue(prev => !prev)}
                className='cursor-pointer'
              >
                {t('ladingheader_header_catalogue') || 'Catalogue'}
              </button>

              {showCatalogue && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-[280px] bg-white text-black rounded-md shadow-lg z-50 overflow-hidden"
                >
                  <ul>
                    {catalogueItems.length === 0 && (
                      <li className="px-4 py-3 text-sm">No files available</li>
                    )}
                    {catalogueItems.map((item, idx) => (
                      <li key={idx} className="border-b last:border-b-0">
                        <a
                          href={item.filename}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="flex justify-between items-center block px-4 py-3 text-sm hover:bg-gray-100"
                          role="menuitem"
                        >
                          <span>{item.name}</span>
                          <span className='text-xs opacity-70'>PDF</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: search, language, mobile hamburger */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search */}
          <div className="flex items-center" ref={wrapperRef}>
            {!showSearch ? (
              <FaSearch
                className='text-[20px] md:text-[24px] cursor-pointer'
                onClick={() => setShowSearch(true)}
              />
            ) : (
              <div className="flex bg-white rounded-2xl border border-gray-300 transition-all duration-75 ease-in-out overflow-hidden">
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Search..."
                  className=" outline-none text-black px-3 w-[160px] md:w-[300px]"
                  style={{ zIndex: 10 }}
                />
                <button
                  onClick={handleSearch}
                  className=" text-black text-2xl md:text-3xl cursor-pointer px-2"
                  aria-label="search"
                >
                  <FaArrowCircleRight />
                </button>
              </div>
            )}
          </div>

          {/* Language select */}
          <div className='hidden sm:block'>
            <select
              id="language-select"
              value={i18n.language}
              onChange={handleLanguageChange}
              className="text-white p-1 rounded"
            >
              <option value="en" style={{color:'black'}}>EN</option>
              <option value="de" style={{color:'black'}}>DE</option>
            </select>
          </div>

          {/* Mobile hamburger */}
          <button
            className='md:hidden p-2'
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FaBars className='text-[20px]' />
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => { setMobileOpen(false); setMobileCatalogueOpen(false); }}
        />

        {/* panel */}
        <aside
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-[85%] max-w-[380px] bg-white text-black transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          role="dialog"
          aria-modal="true"
        >
          <div className='bg-black flex items-center justify-between px-4 py-3 border-b'>
            <div className='flex items-center gap-3'>
              <div className='h-8 w-8 overflow-hidden rounded'>
                <img src={logo} alt='logo' className='h-8 w-8' />
              </div>
              <div className='font-semibold text-white'>Menu</div>
            </div>
            <div className='flex items-center gap-3'>
              <select
                id="language-select-mobile"
                value={i18n.language}
                onChange={handleLanguageChange}
                className="text-white p-1 rounded"
              >
                <option value="en" style={{color:'black'}}>EN</option>
                <option value="de" style={{color:'black'}}>DE</option>
              </select>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className='p-2 text-white'>
                <FaTimes />
              </button>
            </div>
          </div>

          <div className='p-4 space-y-4 overflow-auto h-[calc(100%-64px)]'>
            {/* Search on mobile */}
            <div className='flex items-center gap-2'>
              <input
                type='text'
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder='Search...'
                className='flex-1 border rounded px-3 py-2 outline-none'
              />
              <button onClick={handleSearch} className='p-2'>
                <FaArrowCircleRight />
              </button>
            </div>

            {/* nav links */}
            <nav className='flex flex-col gap-2'>
              <Link onClick={() => setMobileOpen(false)} className='py-2 px-2 rounded hover:bg-gray-100'>{t('ladingheader_header_Style')}</Link>
              <Link onClick={() => setMobileOpen(false)} className='py-2 px-2 rounded hover:bg-gray-100'>{t('ladingheader_header_Gender')}</Link>
              <Link onClick={() => setMobileOpen(false)} className='py-2 px-2 rounded hover:bg-gray-100'>{t('ladingheader_header_Fabric')}</Link>
              <Link onClick={() => setMobileOpen(false)} className='py-2 px-2 rounded hover:bg-gray-100'>{t('ladingheader_header_Composition')}</Link>
              <Link onClick={() => setMobileOpen(false)} className='py-2 px-2 rounded hover:bg-gray-100'>{t('ladingheader_header_Filters')}</Link>
            </nav>

            {/* Mobile Catalogue accordion */}
            <div>
              <button
                onClick={() => setMobileCatalogueOpen(prev => !prev)}
                className='w-full text-left py-2 px-2 rounded flex justify-between items-center bg-gray-50'
              >
                <span>{t('ladingheader_header_catalogue') || 'Catalogue'}</span>
                <span>{mobileCatalogueOpen ? '-' : '+'}</span>
              </button>

              {mobileCatalogueOpen && (
                <ul className='mt-2 border rounded overflow-hidden'>
                  {catalogueItems.length === 0 && <li className='px-4 py-3'>No files available</li>}
                  {catalogueItems.map((item, idx) => (
                    <li key={idx} className='border-b last:border-b-0'>
                      <a
                        href={item.filename}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        onClick={() => { setMobileOpen(false); setMobileCatalogueOpen(false); }}
                        className='block px-4 py-3 hover:bg-gray-100'
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* optional: other quick links */}
            <div className='pt-4 border-t'>
              <a href="/contact" onClick={() => setMobileOpen(false)} className='block py-2'>Contact</a>
              <a href="/about" onClick={() => setMobileOpen(false)} className='block py-2'>About</a>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Header;
