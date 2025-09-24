import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import logo from '../../assets/logo/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaArrowCircleRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const downloads = {
  en: [
    { name: 'Master Catalogue', filename: '/en/EN_Master_catalogs.pdf' },
    { name: 'T-Shirts', filename: '/en/EN_Tshirts_catalog.pdf' },
    { name: 'Beanie and Caps', filename: '/en/EN_Beanie_and_Caps_catalog.pdf' },
    { name: 'Bedsheets', filename: '/en/EN_Bedsheets_catalog.pdf' },
    { name: 'Hoodies', filename: '/en/EN_Hoodies_catalog.pdf' },
    { name: 'Shorts and Pants', filename: '/en/EN_Shorts_and_Pants_catalog.pdf' },
    { name: 'Socks', filename: '/en/EN_Socks_Catalog.pdf' },
  ],
  de: [
    { name: 'Hauptkatalog', filename: '/de/DE_Master_catalogs.pdf' },
    { name: 'T-Shirts', filename: '/de/DE_Tshirts_catalog.pdf' },
    { name: 'Beanie und Caps', filename: '/de/DE_Beanies_and_Caps_catalog.pdf' },
    { name: 'Bettwäsche', filename: '/de/DE_Bedsheets_catalog.pdf' },
    { name: 'Kapuzenpullis', filename: '/de/DE_Hoodies_catalog.pdf' },
    { name: 'Shorts und Hosen', filename: '/de/DE_Shorts_and_Pants_catalog.pdf' },
    { name: 'Socken', filename: '/de/DE_Socks_catalog.pdf' },
  ]
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // language normalized to first two chars (handles en-US etc.)
  const currentLang = (i18n.language || 'en').slice(0, 2);

  // Search state
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  // Catalogue dropdown state
  const [showCatalogue, setShowCatalogue] = useState(false);
  const catalogueRef = useRef(null);

  // refs container for outside click detection
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (showSearch && inputRef.current) inputRef.current.focus();
  }, [showSearch]);

  // Close search or catalogue when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // if click outside both search wrapper and catalogue dropdown, close them
      if (
        wrapperRef.current && !wrapperRef.current.contains(event.target) &&
        catalogueRef.current && !catalogueRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setSearch('');
        setShowCatalogue(false);
      } else {
        // if click outside only search wrapper, close search
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setShowSearch(false);
          setSearch('');
        }
        // if click outside only catalogueRef, close catalogue
        if (catalogueRef.current && !catalogueRef.current.contains(event.target)) {
          setShowCatalogue(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // close dropdowns on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowCatalogue(false);
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

  // items for current language (fallback to en)
  const catalogueItems = downloads[currentLang] || downloads['en'] || [];

  return (
    <div className='bg-black text-white flex px-[10px] md:px-[20px] py-[8px] md:py-[16px] items-center justify-between'>
      <div className='flex gap-10 items-center'>
        <div className='h-[36px] md:h-[50px] rounded-[2px] md:rounded-[6px] overflow-hidden'>
          <img src={logo} className='h-[36px] md:h-[50px]' alt="logo" />
        </div>

        <div className='hidden md:flex gap-[20px] md:gap-[24px] text-[14px] md:text-[19px] items-center'>
          <Link className='cursor-pointer'>{t('ladingheader_header_Style')}</Link>
          <Link className='cursor-pointer'>{t('ladingheader_header_Gender')}</Link>
          <Link className='cursor-pointer'>{t('ladingheader_header_Fabric')}</Link>
          <Link className='cursor-pointer'>{t('ladingheader_header_Composition')}</Link>
          <Link className='cursor-pointer'>{t('ladingheader_header_Filters')}</Link>

          {/* Catalogue header / dropdown */}
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
                className="absolute right-0 mt-2 w-[260px] bg-white text-black rounded-md shadow-lg z-50 overflow-hidden"
              >
                <ul>
                  {catalogueItems.length === 0 && (
                    <li className="px-4 py-3 text-sm">No files available</li>
                  )}
                  {catalogueItems.map((item, idx) => (
                    <li key={idx} className="border-b last:border-b-0">
                      <a
                        href={`/docs/${item.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="block px-4 py-3 text-sm hover:bg-gray-100"
                        role="menuitem"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side: search and language select */}
      <div className="flex items-center gap-4">
        <div className="flex items-center" ref={wrapperRef}>
          {!showSearch ? (
            <FaSearch
              className='text-[20px] md:text-[24px] cursor-pointer'
              onClick={() => setShowSearch(true)}
            />
          ) : (
            <div className={`flex bg-white rounded-2xl border border-gray-300 transition-all duration-75 ease-in-out overflow-hidden`}>
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
                className=" text-black text-2xl md:text-3xl cursor-pointer px-2"
                aria-label="search"
              >
                <FaArrowCircleRight />
              </button>
            </div>
          )}
        </div>

        <div>
          <select
            id="language-select"
            value={i18n.language}
            onChange={handleLanguageChange}
            className="text-white p-1 rounded"
          >
            <option value="en" style={{ color: 'black' }}>EN</option>
            <option value="de" style={{ color: 'black' }}>DE</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Header;
