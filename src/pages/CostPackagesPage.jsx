// 🚀 FIXED CostPackagesPage.jsx
// -- Fully rewritten to use ONLY backend API data --
// -- No hook errors, no static data conflicts --
// -- Cost table support integrated --

import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowRight, Wallet, Search, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ITEMS_PER_PAGE = 10;
const API_URL = import.meta.env.VITE_API_URL;

const CostPackagesPage = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const [treatments, setTreatments] = useState([]);
  const [leadingDoctors, setLeadingDoctors] = useState([]);
  const [leadingHospitals, setLeadingHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultDoctorImage =
    "https://horizons-cdn.hostinger.com/d7d4f7ab-c127-457e-aed8-00842d15e9d6/default-doctor.png";

  // ------------------------------
  // 🚀 Fetch All Treatments
  // ------------------------------
  useEffect(() => {
    const loadTreatments = async () => {
      try {
        const res = await fetch(`${API_URL}/public/treatments`);
        const data = await res.json();

        setTreatments(data);

        // Extract top doctors & hospitals if present
        const doctors = new Map();
        const hospitals = new Map();

        data.forEach((t) => {
          t.doctors?.forEach((d) => doctors.set(d._id, d));
          t.hospitals?.forEach((h) => hospitals.set(h._id, h));
        });

        setLeadingDoctors([...doctors.values()].slice(0, 3));
        setLeadingHospitals([...hospitals.values()].slice(0, 3));

        setLoading(false);
      } catch (err) {
        console.error("Error fetching treatments:", err);
        setLoading(false);
      }
    };

    loadTreatments();
  }, []);

  // -----------------------------------
  // 🔥 Dynamic Categories (from backend)
  // -----------------------------------
  const categories = useMemo(() => {
    const cats = new Set();
    treatments.forEach((t) => {
      cats.add(language === "ar" ? t.categoryAr : t.category);
    });
    return [...cats];
  }, [treatments, language]);

  // -----------------------------------
  // 🔍 Filter + Search
  // -----------------------------------
  const filteredData = useMemo(() => {
    let data = treatments.map((t) => ({
      ...t,
      category: language === "ar" ? t.categoryAr : t.category,
      treatmentName: language === "ar" ? t.treatmentNameAr : t.treatmentName,
      description: language === "ar" ? t.descriptionAr : t.description,
    }));

    if (selectedCategories.size > 0) {
      data = data.filter((item) => selectedCategories.has(item.category));
    }

    if (searchTerm) {
      data = data.filter(
        (item) =>
          item.treatmentName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  }, [searchTerm, selectedCategories, treatments, language]);

  // -----------------------------------
  // 📄 Pagination
  // -----------------------------------
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // -------------------------------
  // ⭐ Loading State
  // -------------------------------
  if (loading) {
    return (
      <div className="py-40 text-center text-xl font-semibold">
        Loading packages...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Treatment Cost & Packages - Hayatra Medglobe`}</title>
      </Helmet>

      <section className="bg-light-bg section-padding">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: t("costPackages") }]} />

          {/* -------------------- */}
          {/* 🔍 Search + Filter */}
          {/* -------------------- */}

          <div className="flex flex-col md:flex-row gap-4 mb-8 mt-8">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={t("searchTreatments") + "..."}
                className="pl-12 py-6 text-base rounded-full border-2 border-slate-200 focus:border-primary-green w-full"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="py-6 rounded-full border-2 border-slate-200 text-slate-700 w-full md:w-auto">
                  Filter by Category <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Treatment Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((cat) => (
                  <DropdownMenuCheckboxItem
                    key={cat}
                    checked={selectedCategories.has(cat)}
                    onCheckedChange={() => {
                      const newSet = new Set(selectedCategories);
                      if (newSet.has(cat)) newSet.delete(cat);
                      else newSet.add(cat);
                      setSelectedCategories(newSet);
                      setCurrentPage(1);
                    }}
                  >
                    {cat}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* -------------------- */}
          {/* 🔥 Active Filters */}
          {/* -------------------- */}

          {selectedCategories.size > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {[...selectedCategories].map((cat) => (
                <span
                  key={cat}
                  className="bg-primary-blue/10 text-primary-blue text-sm font-medium px-3 py-1 rounded-full flex items-center"
                >
                  {cat}
                  <button
                    onClick={() => {
                      const newSet = new Set(selectedCategories);
                      newSet.delete(cat);
                      setSelectedCategories(newSet);
                    }}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* ------------------------- */}
          {/* 💰 Treatment Cards */}
          {/* ------------------------- */}

          <div className="grid md:grid-cols-2 gap-8">
            {paginatedData.map((t, index) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              >
                <h3 className="text-xl font-bold text-dark-blue mb-2">
                  {t.treatmentName}
                </h3>

                <p className="text-sm text-primary-green font-semibold mb-3 text-left">
                  {t.category}
                </p>

                <p className="text-slate-600 text-sm mb-4 text-justify">
                  {t.description}
                </p>

                <div className="text-center bg-primary-blue/10 py-3 px-4 rounded-lg mb-4">
                  <p className="text-sm text-primary-blue">Indicative Cost</p>
                  <p className="text-xl font-bold text-dark-blue">
                    {t.costTable?.length > 0 ? t.costTable[0]?.cost : "Contact Us"}
                  </p>
                </div>

                <Link to={`/treatments/${t.slug}`}>
                  <Button className="w-full btn-secondary">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-500">No treatments found.</p>
            </div>
          )}
          

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />



          {/* ------------------------------ */}
          {/* ⭐ Recommended Section */}
          {/* ------------------------------ */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 bg-primary-blue/10 border-l-4 border-primary-blue p-8 rounded-xl text-center"
          >
            <Wallet className="h-12 w-12 mx-auto text-primary-blue mb-4" />
            <h2 className="text-2xl font-bold text-dark-blue mb-2">
              Need a Personalized Quote?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6 text-justify">
              Prices are indicative. Get an exact treatment plan and quote after
              medical evaluation.
            </p>
            <Link to="/get-quote">
              <Button className="btn-secondary text-lg">
                Get a Free Personalized Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CostPackagesPage;
