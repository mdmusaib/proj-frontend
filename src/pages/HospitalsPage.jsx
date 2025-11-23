import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Award, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/Pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HospitalsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ city: 'all', accreditation: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const hospitalsPerPage = 6;

  // 🚀 Replace with YOUR backend URL:
  const API_URL = import.meta.env.VITE_API_URL;


  // 🔥 Fetch hospitals from backend
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await  fetch(`${API_URL}/admin/hospitals`)
        const data = await res.json();
        setHospitals(data);
      } catch (err) {
        console.error("Failed to load hospitals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const cities = useMemo(() => {
    return [...new Set(hospitals.map(h => h.location?.split(',')[0].trim()))];
  }, [hospitals]);

  const accreditations = useMemo(() => {
    return [...new Set(hospitals.flatMap(h => h.accreditations || []))];
  }, [hospitals]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ city: 'all', accreditation: 'all' });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital => {
      const name = hospital.name || "";
      const location = hospital.location || "";
      const accList = hospital.accreditations || [];

      const cityMatch =
        filters.city === 'all' ||
        location.toLowerCase().includes(filters.city.toLowerCase());

      const accreditationMatch =
        filters.accreditation === 'all' ||
        accList.includes(filters.accreditation);

      const searchMatch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.toLowerCase().includes(searchTerm.toLowerCase());

      return cityMatch && accreditationMatch && searchMatch;
    });
  }, [searchTerm, filters, hospitals]);

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstHospital, indexOfLastHospital);
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };

  return (
    <>
      <Helmet>
        <title>Top Hospitals - Hayatra Medglobe</title>
        <meta name="description" content="Find top hospitals with expert doctors and advanced treatments." />
      </Helmet>

      <section className="section-padding bg-light-bg">
        <div className="container mx-auto px-4">

          {/* 🔍 Search */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="mb-6">{t('hospitals')}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 text-justify">
              {t('partnerHospitalsDesc')}
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={t('searchHospitals')}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-12 py-6 text-lg rounded-full border-2 border-slate-200"
              />
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">

            {/* 🧩 Sidebar Filters */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-6 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <h3 className="flex items-center"><SlidersHorizontal className="mr-2 h-5 w-5" /> Filters</h3>

                {/* City Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-600">{t('filterByCity')}</label>
                  <Select value={filters.city} onValueChange={(value) => handleFilterChange('city', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('allCities')}</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Accreditation Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-600">{t('filterByAccreditation')}</label>
                  <Select value={filters.accreditation} onValueChange={(value) => handleFilterChange('accreditation', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('allAccreditations')}</SelectItem>
                      {accreditations.map(acc => (
                        <SelectItem key={acc} value={acc}>{acc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="ghost" onClick={resetFilters} className="w-full text-primary-blue">
                  <X className="mr-2 h-4 w-4" /> {t('resetFilters')}
                </Button>
              </div>
            </aside>

            {/* 🏥 Hospital Cards */}
            <main className="lg:w-3/4">

              {loading ? (
                <p className="text-center text-gray-600">Loading hospitals...</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {currentHospitals.map((hospital, index) => (
                    <motion.div
                      key={hospital.slug}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col border border-slate-100"
                    >
                      <img className="w-full h-48 object-cover" alt={hospital.name} src={hospital.image} />

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl mb-2">{hospital.name}</h3>

                        <div className="flex items-center mb-3 text-slate-600">
                          <MapPin className="h-4 w-4 mr-2 text-primary-green" />
                          <span className="text-sm">{hospital.location}</span>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm font-semibold text-slate-700 mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                              <span className="bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-full text-xs font-medium">
                                {hospital.specialty}
                              </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4 text-sm">
                          <Award className="h-4 w-4 text-primary-green" />
                          <span>{hospital.accreditations?.join(', ')}</span>
                        </div>

                        <div className="flex items-center bg-primary-green/10 px-3 py-1 rounded-full w-fit mb-4">
                          <Star className="h-4 w-4 text-primary-green mr-1" />
                          <span className="font-semibold text-primary-green">{hospital.rating}</span>
                        </div>

                        <Link to={`/hospitals/${hospital.slug}`}>
                          <Button className="w-full btn-primary">View Details</Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}

            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default HospitalsPage;
