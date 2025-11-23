import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, MessageSquare, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
const isAdmin = localStorage.getItem("adminToken") ? true : false;
console.log("isAdmin:", isAdmin);

 const navItems = isAdmin
  ? [
      { path: '/', label: 'Home' },
      { path: '/admin/hospitals', label: 'Hospitals' },
      { path: '/admin/doctors', label: 'Doctors' },
      { path: '/admin/treatments', label: 'Treatments' },
    ]
  : [
      { path: '/', label: t('home') },
      { path: '/about', label: t('about') },
      { path: '/treatments', label: t('treatments') },
      { path: '/hospitals', label: t('hospitals') },
      { path: '/doctors', label: t('doctors') },
      { path: '/services', label: t('services') },
      { path: '/cost-packages', label: t('costPackages') },
      { path: '/patient-stories', label: t('patientStories') },
      { path: '/knowledge', label: t('knowledge') },
    ];


  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const openWhatsApp = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin/login";
};
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 border-b border-slate-200">
          <a href="mailto:hayatramedglobe@gmail.com">
            <Button variant="ghost" className="text-slate-600 hover:text-primary-green px-2">
              <Mail className="h-4 w-4 me-2"/> {t('emailUs')}
            </Button>
          </a>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white rounded-full">
                  <MessageSquare className="h-4 w-4 me-2"/> {t('chatOnWhatsApp')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => openWhatsApp('https://wa.me/917092455157')}>
                  Chat in English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openWhatsApp('https://wa.me/919716511527')}>
                  Chat in Arabic
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hover:bg-slate-100"
            >
              <Globe className="h-5 w-5 text-slate-600" />
              <span className="ms-2 text-sm font-medium text-slate-700">{language === 'en' ? 'AR' : 'EN'}</span>
            </Button>
          </div>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img alt="Hayatra Medglobe Logo" className="h-14 md:h-16 w-auto" src="https://horizons-cdn.hostinger.com/d7d4f7ab-c127-457e-aed8-00842d15e9d6/c4ef236f0bb6220b531672dc9922a13e.png" />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-semibold transition-colors duration-300 pb-1 ${
                  isActive(item.path)
                    ? 'text-primary-green border-b-2 border-primary-green'
                    : 'text-slate-700 hover:text-primary-green'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex">
             <Link to="/get-quote">
              <Button className="btn-primary rounded-full text-base px-6 py-3">
                {t('getQuote')}
              </Button>
            </Link>
          </div>
          {isAdmin && (
  <button
    onClick={handleLogout}
    className="ml-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
)}
          
          

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium py-2 px-4 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-green-100 text-primary-green'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAdmin && (
  <button
    onClick={handleLogout}
    className="ml-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
  >
    Logout
  </button>
)}
                <div className="pt-4">
                  <Link to="/get-quote" onClick={() => setIsOpen(false)}>
                    <Button className="btn-primary w-full text-base">
                      {t('getQuote')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;