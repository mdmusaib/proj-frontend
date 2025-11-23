import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plane, Stethoscope, FileText, UserCheck, HeartHandshake, MessageSquare, Briefcase, Landmark, PhoneCall, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FreeEvaluationForm from '@/components/FreeEvaluationForm';
import { hospitalsData } from '@/data/hospitalsData';

const ServicesPage = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Briefcase, title: t('freeTreatmentQuote'), description: t('freeTreatmentQuoteDesc') },
    { icon: Plane, title: t('visaAssistance'), description: t('visaAssistanceDesc') },
    { icon: Landmark, title: "Hospital Admission & Coordination", description: "We work directly with India’s NABH & JCI-accredited hospitals, ensuring priority admission and seamless coordination with top doctors. Your dedicated case manager handles all appointments and updates." },
    { icon: FileText, title: t('travelAndStay'), description: t('travelAndStayDesc') },
    { icon: MessageSquare, title: "Language & Interpretation", description: "No language barriers—only understanding. We provide professional interpreters to ensure clear communication between you and your medical team." },
    { icon: UserCheck, title: t('postTreatmentCare'), description: t('postTreatmentCareDesc') },
    { icon: PhoneCall, title: "24/7 Patient Support", description: "Our team is available around the clock for any medical or travel-related needs. Your peace of mind is our priority." },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  return (
    <>
      <Helmet>
        <title>Our Comprehensive Services - Hayatra Medglobe</title>
        <meta name="description" content="From your first medical query to your successful recovery, Hayatra Medglobe provides end-to-end support to make your medical travel simple, safe, and stress-free." />
      </Helmet>

      <div className="relative bg-cover bg-center py-32 md:py-48" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584515933412-24bee2825747?q=80&w=2070&auto=format&fit=crop')` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-cyan-50/70 to-blue-100/60 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4">
            Your Health Journey, Our Complete Care
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-justify">
            {t('servicesPageDesc')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Link to="/get-quote"><Button className="btn-primary rounded-full text-lg px-8 py-4">{t('getFreeQuote')}</Button></Link>
          </motion.div>
        </div>
      </div>

      <div className="section-padding bg-light-bg">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="mb-4">{t('ourServices')}</h2>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {services.map((service, index) => (
              <motion.div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 card-hover flex flex-col items-start" variants={itemVariants}>
                <div className="bg-primary-green/10 p-4 rounded-full mb-6">
                  <service.icon className="w-10 h-10 text-primary-green" />
                </div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="flex-grow text-justify">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
            <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="mb-4">{t('whyChooseUs')}</h2>
            </motion.div>
            <div className="max-w-6xl mx-auto bg-light-bg p-8 rounded-2xl shadow-xl border grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-primary-blue mb-6">Our Commitment to You:</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center text-lg"><HeartHandshake className="h-6 w-6 text-primary-green me-3 flex-shrink-0" />100% Free Patient Support (No hidden fees)</li>
                        <li className="flex items-center text-lg"><ShieldCheck className="h-6 w-6 text-primary-green me-3 flex-shrink-0" />Trusted by patients from 30+ countries</li>
                        <li className="flex items-center text-lg"><Stethoscope className="h-6 w-6 text-primary-green me-3 flex-shrink-0" />Access to India’s best doctors & hospitals</li>
                        <li className="flex items-center text-lg"><FileText className="h-6 w-6 text-primary-green me-3 flex-shrink-0" />A transparent process with clear communication</li>
                        <li className="flex items-center text-lg"><UserCheck className="h-6 w-6 text-primary-green me-3 flex-shrink-0" />Personalized, compassionate care for every patient</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-primary-blue mb-4">Our Partner Hospital Network</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {hospitalsData.slice(0, 6).map(hospital => (
                            <div key={hospital.slug} className="bg-white p-3 rounded-lg shadow-md border">
                                <img src={hospital.logo} alt={`${hospital.name} logo`} className="h-12 object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>

      <section className="section-padding bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FreeEvaluationForm title="Request a Free Consultation" description="Fill out the form below to get started. Our team will connect with you within 24 hours to assist you." />
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;