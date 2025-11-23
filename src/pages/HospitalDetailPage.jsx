import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const HospitalDetailPage = () => {
  const { slug } = useParams();

  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiURL}/public/hospitals/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setHospital(data);

        // Fetch doctors for this hospital
        fetch(`${apiURL}/public/hospitals/${data._id}/doctors`)
          .then((res) => res.json())
          .then((docList) => setDoctors(docList));
      });
  }, [slug]);

  if (!hospital) return <div className="p-20">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>{hospital.name} - Hospital</title>
      </Helmet>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          
          {/* MAIN */}
          <div className="lg:col-span-2">
            <img
              src={`${apiURL}${hospital.image}`}
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />

            <h1 className="mt-6">{hospital.name}</h1>

            <div className="text-slate-600 flex items-center mt-3">
              <MapPin className="h-5 mr-2 text-primary-green" />
              {hospital.location}
            </div>

            <p className="mt-6 text-lg">{hospital.description}</p>

            {/* Doctors */}
            <h2 className="text-3xl mt-16 mb-6">Specialist Doctors</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {doctors.map((doc) => (
                <Link key={doc._id} to={`/doctors/${doc.slug}`} className="block">
                  <div className="bg-white p-6 rounded-2xl shadow border flex gap-4">
                    <img
                      src={`${apiURL}${doc.image}`}
                      className="w-24 h-28 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-bold">{doc.name}</p>
                      <p className="text-primary-green">{doc.specialty}</p>
                      <p className="text-sm text-slate-500 mt-1">{doc.experience}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="sticky top-24 space-y-6">

            <div className="bg-gradient-to-br from-blue-700 to-cyan-600 text-white p-8 rounded-2xl shadow">
              <h3 className="text-2xl font-bold">Quick Contact</h3>

              <p className="flex items-center mt-4">
                <Phone className="h-5 mr-3" /> +91-70924-55157
              </p>

              <p className="flex items-center mt-3">
                <Mail className="h-5 mr-3" /> contact@hayatramedglobe.com
              </p>

              <Link to="/get-quote">
                <Button className="w-full mt-8 bg-white text-blue-800">
                  Get Free Quote
                </Button>
              </Link>
            </div>

          </aside>

        </div>
      </section>
    </>
  );
};

export default HospitalDetailPage;
