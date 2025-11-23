import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Stethoscope, Medal, GraduationCap, Building, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FreeEvaluationForm from '@/components/FreeEvaluationForm';

const DoctorDetailPage = () => {
  const { slug } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiURL}/public/doctors/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);

        // Fetch hospital linked to this doctor
        if (data.hospitalId) {
          fetch(`${apiURL}/public/hospitals/${data.hospitalId}`)
            .then((res) => res.json())
            .then((h) => setHospital(h));
        }
      });
  }, [slug]);

  if (!doctor) {
    return <div className="container mx-auto px-4 py-20">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{doctor.name} - {doctor.specialty}</title>
      </Helmet>

      <section className="section-padding bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* MAIN */}
            <main className="lg:col-span-2">
              <motion.div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-start gap-8">
                  <img
                    className="w-40 h-40 object-cover rounded-xl"
                    src={`${apiURL}${doctor.image}`}
                    alt={doctor.name}
                  />
                  <div>
                    <h1 className="text-4xl">{doctor.name}</h1>
                    <p className="text-primary-green text-lg">{doctor.specialty}</p>

                    <div className="mt-4 space-y-3">
                      <p><Stethoscope className="inline h-5" /> {doctor.specialty}</p>
                      <p><Medal className="inline h-5" /> {doctor.experience}</p>
                      <p><GraduationCap className="inline h-5" /> {doctor.degree}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="mb-4">About</h2>
                <p>{doctor.about}</p>
              </motion.div>

              {doctor.procedures?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <h2 className="mb-6">Procedures Performed</h2>
                  {doctor.procedures.map((p, i) => (
                    <p key={i}><CheckCircle className="inline h-5 text-green-500" /> {p}</p>
                  ))}
                </div>
              )}

              {doctor.faqs?.length > 0 && (
                <Accordion type="single" collapsible className="bg-white p-6 shadow-xl rounded-2xl">
                  {doctor.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </main>

            {/* SIDEBAR */}
            <aside className="lg:col-span-1 space-y-8 sticky top-24">
              <FreeEvaluationForm />

              {hospital && (
                <div className="bg-white p-6 shadow-xl rounded-2xl">
                  <h3 className="mb-4">Affiliated Hospital</h3>
                  <Link to={`/hospitals/${hospital.slug}`}>
                    <img
                      src={`${apiURL}${hospital.image}`}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <p className="text-primary-blue mt-3">{hospital.name}</p>
                    <p className="text-sm"><MapPin className="inline h-4" /> {hospital.location}</p>
                  </Link>
                </div>
              )}
            </aside>

          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorDetailPage;
