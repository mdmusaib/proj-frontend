import React, { useState, useRef, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Stethoscope,
  Medal,
  MapPin,
  GraduationCap,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";
import FreeEvaluationForm from "@/components/FreeEvaluationForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DoctorsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ city: "all", specialty: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 10;
  const formRef = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultDoctorImage =
    "https://horizons-cdn.hostinger.com/d7d4f7ab-c127-457e-aed8-00842d15e9d6/default-doctor.png";

  const API_URL = import.meta.env.VITE_API_URL;

  // -------------------------------
  // ⭐ LOAD FROM API
  // -------------------------------
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/doctors`);
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to load doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleRequestOpinion = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // -------------------------------
  // ⭐ Dynamic filters
  // -------------------------------
  const cities = useMemo(() => {
    const list = doctors
      .map((d) => d.hospital?.location?.split(",")[0]?.trim())
      .filter(Boolean);
    return [...new Set(list)];
  }, [doctors]);

  const specialties = useMemo(() => {
    const list = doctors.map((d) => d.specialty).filter(Boolean);
    return [...new Set(list)];
  }, [doctors]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ city: "all", specialty: "all" });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // -------------------------------
  // ⭐ Filtering logic
  // -------------------------------
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const cityName = doctor.hospital?.location?.toLowerCase() || "";
      const doctorHospital = doctor.hospital?.name || "";

      const cityMatch =
        filters.city === "all" ||
        cityName.includes(filters.city.toLowerCase());

      const specialtyMatch =
        filters.specialty === "all" ||
        doctor.specialty?.toLowerCase() === filters.specialty.toLowerCase();

      const searchMatch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctorHospital.toLowerCase().includes(searchTerm.toLowerCase());

      return cityMatch && specialtyMatch && searchMatch;
    });
  }, [searchTerm, filters, doctors]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  // -------------------------------
  // ⭐ Loading state
  // -------------------------------
  if (loading) {
    return (
      <div className="py-40 text-center text-xl font-semibold">
        Loading doctors...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("topDoctorsInIndia")} - Hayatra Medglobe</title>
        <meta name="description" content={t("findLeadingDoctorsDescription")} />
      </Helmet>

      <section className="bg-light-bg py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-dark-blue">
              {t("doctors")}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 text-justify">
              {t("consultWithIndiasRenowned")}
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={t("searchDoctors")}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12 py-6 text-lg rounded-full border-2 border-primary-green/30 focus:border-primary-green"
              />
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* ---------------- FILTERS ---------------- */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-6 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <h3 className="text-xl font-bold text-dark-blue flex items-center">
                  <SlidersHorizontal className="mr-2 h-5 w-5" /> Filters
                </h3>

                {/* City Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    {t("filterByCity")}
                  </label>
                  <Select
                    value={filters.city}
                    onValueChange={(value) =>
                      handleFilterChange("city", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("allCities")}</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Specialty Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    {t("filterBySpecialty")}
                  </label>
                  <Select
                    value={filters.specialty}
                    onValueChange={(value) =>
                      handleFilterChange("specialty", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("allSpecialties")}</SelectItem>
                      {specialties.sort().map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  className="w-full text-primary-blue"
                >
                  <X className="mr-2 h-4 w-4" /> {t("resetFilters")}
                </Button>
              </div>
            </div>

            {/* ---------------- DOCTOR CARDS ---------------- */}
            <div className="lg:w-3/4">
              <div className="grid md:grid-cols-2 gap-8">
                {currentDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.slug}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-32 flex-shrink-0">
                          <img
                            className="w-full h-full rounded-lg object-cover object-top border-4 border-white shadow-md"
                            alt={doctor.name}
                            src={doctor.image || defaultDoctorImage}
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-dark-blue">
                            {doctor.name}
                          </h3>

                          <div className="flex items-center text-primary-green font-semibold mt-1">
                            <Stethoscope className="h-4 w-4 mr-2" />
                            <span>{doctor.specialty}</span>
                          </div>

                          <div className="flex items-center text-slate-600 text-sm mt-2">
                            <Medal className="h-4 w-4 mr-2" />
                            <span>{doctor.experience} Experience</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-start text-slate-600 text-sm mb-2">
                          <GraduationCap className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                          <span className="truncate">{doctor.degree}</span>
                        </div>

                        <div className="flex items-start text-slate-600 text-sm">
                          <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                          <span>{doctor.hospital?.name}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <Link to={`/doctors/${doctor.slug}`} className="flex-1">
                          <Button className="w-full btn-primary">
                            {t("viewProfile")}
                          </Button>
                        </Link>

                        <Button
                          variant="outline"
                          className="flex-1 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                          onClick={handleRequestOpinion}
                        >
                          {t("requestAnOpinion")}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Request form scroll target */}
      <div ref={formRef} className="pt-20">
        <FreeEvaluationForm />
      </div>
    </>
  );
};

export default DoctorsPage;
