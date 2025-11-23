import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Linkedin, Send, Youtube, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import XIcon from '@/components/XIcon';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Subscribed! 🎉",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail('');
  };

  const quickLinks = [
    { path: '/about', label: t('about') },
    { path: '/how-it-works', label: t('howItWorks') },
    { path: '/services', label: t('services') },
    { path: '/patient-stories', label: t('patientStories') },
    { path: '/knowledge', label: t('knowledge') },
    { path: '/contact', label: t('contact') },
  ];
  
  const popularTreatments = [
    { path: '/treatments/transplant-advanced-surgeries', label: t('organTransplant') },
    { path: '/treatments/cancer-blood-disorders', label: t('cancerCare') },
    { path: '/treatments/heart-internal-medicine', label: t('cardiacSciences') },
    { path: '/treatments/brain-spine-care', label: t('neurosciences') },
    { path: '/treatments/bone-spine-joint-care', label: t('orthopedics') },
    { path: '/treatments/womens-health-maternity', label: t('ivfTreatment') },
  ];

  const legalLinks = [
    { path: '/terms-of-use', label: t('termsOfUse') },
    { path: '/privacy-policy', label: t('privacyPolicy') },
    { path: '/disclaimer', label: t('disclaimer') },
  ];

  return (
    <footer className="bg-dark-blue text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/">
              <img alt="Hayatra Medglobe Logo" className="h-16 mb-4" src="https://horizons-cdn.hostinger.com/d7d4f7ab-c127-457e-aed8-00842d15e9d6/c4ef236f0bb6220b531672dc9922a13e.png" />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 text-justify">
              {t('heroDescription')}
            </p>
            <h4 className="text-lg font-bold mb-4 text-primary-green text-left">{t('newsletter')}</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center">
              <Input 
                type="email" 
                placeholder={t('yourEmail')} 
                className="bg-slate-800 border-slate-700 text-white rounded-r-none focus:ring-primary-green focus:border-primary-green"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="btn-primary rounded-l-none text-center">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-primary-green text-left">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-left">
              {quickLinks.map(link => (
                <li key={link.path}><Link to={link.path} className="text-slate-300 hover:text-primary-green transition-colors text-sm text-justify-none">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-bold mb-4 text-primary-green text-left">{t('popularTreatments')}</h4>
            <ul className="space-y-2 text-left">
              {popularTreatments.map(link => (
                <li key={link.path}><Link to={link.path} className="text-slate-300 hover:text-primary-green transition-colors text-sm text-justify-none">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4 text-primary-green text-left">{t('contactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-left">
                <Phone className="h-4 w-4 text-primary-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 text-justify-none">{t('forEnglish')}</p>
                  <a href="tel:+917092455157" className="text-slate-300 hover:text-primary-green text-sm text-justify-none">+91 70924 55157</a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-left">
                <Phone className="h-4 w-4 text-primary-green mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 text-justify-none">{t('forArabic')}</p>
                  <a href="tel:+919716511527" className="text-slate-300 hover:text-primary-green text-sm text-justify-none">+91 97165 11527</a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-left">
                <Mail className="h-4 w-4 text-primary-green mt-1 flex-shrink-0" />
                 <a href="mailto:hayatramedglobe@gmail.com" className="text-slate-300 hover:text-primary-green break-all text-sm text-justify-none">
                  hayatramedglobe@gmail.com
                </a>
              </li>
               <li className="flex items-start space-x-3 text-left">
                <MapPin className="h-4 w-4 text-primary-green mt-1 flex-shrink-0" />
                 <p className="text-slate-300 text-sm text-justify-none">
                  India – 122001
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-8">
          <div className="text-xs text-slate-400 space-y-4 mb-8 text-justify">
            <p><span className="font-bold text-justify-none">{t('noteTitle')}:</span> {t('noteDescription')}</p>
            <p>{t('copyrightNotice')}</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 border-t border-slate-700 pt-8">
            <div className="text-slate-400 text-sm mb-4 sm:mb-0 flex flex-col sm:flex-row items-center gap-x-4 gap-y-2 text-justify-none">
              <span>© {new Date().getFullYear()} Hayatra Medglobe. {t('allRightsReserved')}.</span>
              <div className="flex gap-x-4">
                {legalLinks.map(link => (
                  <Link key={link.path} to={link.path} className="hover:text-primary-green transition-colors text-justify-none">{link.label}</Link>
                ))}
              </div>
            </div>
            <div className="flex space-x-3">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-primary-green transition-colors">
                <XIcon className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-primary-green transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-primary-green transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-primary-green transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;