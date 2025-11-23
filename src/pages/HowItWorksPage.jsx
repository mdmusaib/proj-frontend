import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileSearch, MessageSquare, Plane, Stethoscope, Home, Smile } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

const HowItWorksPage = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: FileSearch,
      title: "1. Share Your Medical Reports",
      description: "Submit your medical case through our secure platform. Our team reviews your needs to connect you with the right specialists.",
    },
    {
      icon: MessageSquare,
      title: "2. Receive Treatment Plans & Quotes",
      description: "Get multiple, transparent quotes and detailed treatment plans from India's top hospitals within 48 hours, completely free of charge.",
    },
    {
      icon: Stethoscope,
      title: "3. Virtual Doctor Consultation",
      description: "We arrange a tele-consultation with your chosen doctor to discuss your treatment plan and answer all your questions before you travel.",
    },
    {
      icon: Plane,
      title: "4. Travel & Arrival Assistance",
      description: "Our team assists with your medical visa, flight bookings, and provides complimentary airport pickup upon your arrival in India.",
    },
    {
      icon: Home,
      title: "5. Treatment & Recovery",
      description: "Receive world-class medical treatment. We ensure your comfort and handle all logistics, including hospital admission and accommodation.",
    },
    {
      icon: Smile,
      title: "6. Post-Treatment Follow-up",
      description: "After your successful treatment and return home, we facilitate follow-up consultations to ensure your continued well-being.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>How It Works - Your Medical Journey with Hayatra Medglobe</title>
        <meta name="description" content="Learn about the simple, step-by-step process for planning your medical treatment in India with Hayatra Medglobe. From free quotes to post-treatment care." />
      </Helmet>

      <section className="bg-light-bg py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
             <Breadcrumb items={[{ label: t('howItWorks') }]} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-dark-blue">
              {t('howItWorks')}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your seamless medical journey to India in 6 simple steps.
            </p>
          </motion.div>

          <div className="relative">
            {/* Dashed line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-transparent">
               <svg width="100%" height="100%">
                  <line x1="0" y1="0" x2="100%" y2="0" strokeWidth="4" strokeDasharray="10 10" className="stroke-primary-green/30"/>
               </svg>
            </div>

            <div className="grid lg:grid-cols-3 gap-x-8 gap-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-100 z-10"
                >
                  <div className="absolute -top-10 flex items-center justify-center w-20 h-20 bg-primary-green rounded-full border-4 border-white text-white">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-blue mt-10 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksPage;