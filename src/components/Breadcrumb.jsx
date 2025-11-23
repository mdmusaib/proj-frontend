import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Breadcrumb = ({ items }) => {
  const { t } = useLanguage();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-primary-blue text-justify-none">
            {t('home')}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-slate-400" />
              {item.link ? (
                <Link to={item.link} className="ms-1 text-sm font-medium text-slate-700 hover:text-primary-blue md:ms-2 text-justify-none">
                  {item.label}
                </Link>
              ) : (
                <span className="ms-1 text-sm font-medium text-slate-500 md:ms-2 text-justify-none">{item.label}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;