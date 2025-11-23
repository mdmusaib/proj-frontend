import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DefaultIcon = () => (
  <div className="h-8 w-8 rounded-full bg-primary-green"></div>
);

const TreatmentsPage = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState([]);
  const [leadingDoctors, setLeadingDoctors] = useState([]);
  const [leadingHospitals, setLeadingHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultDoctorImage =
    "https://horizons-cdn.hostinger.com/d7d4f7ab-c127-457e-aed8-00842d15e9d6/default-doctor.png";

  const apiURL = import.meta.env.VITE_API_URL;

  // Fetch data
  useEffect(() => {
    fetch(`${apiURL}/public/treatments`)
      .then((res) => res.json())
      .then((treatments) => {
        setCategories(treatments);
      });

    fetch(`${apiURL}/public/top-doctors`)
      .then((res) => res.json())
      .then((doctors) => {
        setLeadingDoctors(doctors);
      });

    fetch(`${apiURL}/public/top-hospitals`)
      .then((res) => res.json())
      .then((hospital) => {
        setLeadingHospitals(hospital);
        setLoading(false);
      });
  }, [apiURL]);

  // Search Filter (fixed)
  const filteredCategories = categories.filter((cat) =>
    cat.treatmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-40 text-center text-xl font-semibold">
        Loading treatments...
      </div>
    );
  }

  return (
    <section className="bg-light-bg py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Search */}
        <div className="flex gap-4 mb-10">
          <Input
            placeholder={t("searchTreatments")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>
            <Search />
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT SIDE - Treatments */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-8">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Link
                    to={`/treatments/${category.category}`}
                    className="block bg-white rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="p-6 flex items-center gap-4">
                      <div className="bg-primary-green/10 p-4 rounded-full">
                        <DefaultIcon />
                      </div>

                      {/* FIXED Title */}
                      <h3 className="text-xl font-bold text-dark-blue">
                        {language === "en"
                          ? category.treatmentName
                          : category.treatmentNameAr ||
                            category.treatmentName}
                      </h3>
                    </div>

                    {/* Description section */}
                    <div className="p-6 pt-0">
                      {category.description && (
                        <p className="text-sm text-slate-600 line-clamp-4">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-10">

              {/* ⭐ Leading Doctors */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border">
                <h3 className="text-2xl font-bold mb-6">
                  {t("leadingDoctors")}
                </h3>

                {leadingDoctors.length === 0 ? (
                  <p className="text-slate-400 text-sm">Loading doctors…</p>
                ) : (
                  leadingDoctors.slice(0, 3).map((doctor) => (
                    <Link
                      key={doctor._id}
                      to={`/doctors/${doctor.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50">
                        <img
                          src={
                            doctor.image
                              ? `${apiURL}${doctor.image}`
                              : defaultDoctorImage
                          }
                          className="w-24 h-32 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-bold group-hover:text-primary-green">
                            {doctor.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}

                <Link to="/doctors">
                  <Button className="w-full mt-6">
                    {t("viewAllDoctors")}
                  </Button>
                </Link>
              </div>

              {/* ⭐ Leading Hospitals */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border">
                <h3 className="text-2xl font-bold mb-6">
                  {t("topHospitals")}
                </h3>

                {leadingHospitals.length === 0 ? (
                  <p className="text-slate-400 text-sm">Loading hospitals…</p>
                ) : (
                  leadingHospitals.map((hospital) => (
                    <Link
                      key={hospital._id}
                      to={`/hospitals/${hospital.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50">
                        <img
                          src={
                            hospital.image
                              ? `${apiURL}${hospital.image}`
                              : "https://via.placeholder.com/100x80"
                          }
                          className="w-24 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-bold group-hover:text-primary-green">
                            {hospital.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {hospital.location}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}

                <Link to="/hospitals">
                  <Button className="w-full mt-6">
                    {t("viewAllHospitals")}
                  </Button>
                </Link>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default TreatmentsPage;
