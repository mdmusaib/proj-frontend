import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Globe2, Users, Stethoscope, FileText, Languages, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { hospitalsData } from '@/data/hospitalsData';
import { doctorsData } from '@/data/doctorsData';
import FreeEvaluationForm from '@/components/FreeEvaluationForm';
import { treatmentsData } from '@/data/treatmentsData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HomePage = () => {
  const { t } = useLanguage();

  const howItWorksSteps = [
    { icon: FileText, title: "Submit Your Enquiry", description: "Share your medical reports and treatment requirements with us. It's simple and confidential." },
    { icon: Stethoscope, title: "Receive a Treatment Plan", description: "We connect you with top specialists who provide a detailed treatment plan and cost estimate." },
    { icon: Globe2, title: "Travel to India with Ease", description: "We provide complete assistance with medical visas, travel, and comfortable accommodation." },
    { icon: Heart, title: "Return Home Healthy", description: "We ensure you receive excellent post-treatment care and facilitate seamless follow-ups." },
  ];

  const topTreatments = useMemo(() => {
    const popularTreatmentNames = [
      "Angioplasty", "CABG (Bypass Surgery)", "Total Knee Replacement",
      "Hip Replacement", "Brain Tumor Surgery", "Chemotherapy (per cycle)",
      "Kidney Transplant", "IVF (per cycle)"
    ];
    return treatmentsData.filter(t => popularTreatmentNames.includes(t.treatmentName))
                         .map(t => ({ name: t.treatmentName, cost: t.costRange, category: t.category }))
                         .slice(0, 6);
  }, []);

  const topHospitals = useMemo(() => {
    return [...hospitalsData].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6);
  }, []);

  const leadingDoctors = useMemo(() => {
    const topDocs = doctorsData.filter(d => d.isTopDoctor);
    const shuffled = [...topDocs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, []);

  const patientStories = [
    { story: "My mother’s heart surgery in India was smooth and affordable. The care was exceptional, and the Hayatra Medglobe team supported us at every step. We are deeply grateful.", name: "Amina Yusuf", country: "From Nigeria", flag: "🇳🇬" },
    { story: "From visa support to post-surgery care, the service was excellent. Hayatra Medglobe made a complex medical journey feel simple and reassuring. Highly recommended.", name: "Ahmed Al-Farsi", country: "From Oman", flag: "🇴🇲" },
    { story: "The team made everything easy, including language translation. We felt understood and cared for throughout our stay. Thank you for your professionalism and compassion.", name: "Grace Wanjiru", country: "From Kenya", flag: "🇰🇪" },
  ];

  const whyChooseUs = [
    { icon: Users, text: "End-to-End Support" },
    { icon: Stethoscope, text: "100% Free Consultation" },
    { icon: Languages, text: "English & Arabic Language Support" },
    { icon: FileText, text: "Cost Transparency" },
    { icon: Award, text: "JCI-Accredited Hospitals" },
    { icon: Globe2, text: "24×7 Global Assistance" },
  ];

  const blogPosts = [
    { title: "Top 10 Hospitals in India for Cancer Treatment", link: "/knowledge/top-10-hospitals-cancer-treatment" },
    { title: "Why India Is the Global Hub for Medical Tourism", link: "/knowledge/india-medical-tourism-hub" },
    { title: "Understanding IVF Success Rates in India", link: "/knowledge/ivf-success-rates-india" },
  ];

  const defaultDoctorImage = "https://horizons-cdn.hostinger.com/d7d4f7ab-c127-457e-aed8-00842d15e9d6/default-doctor.png";


  return (
    <>
      <Helmet>
        <title>Hayatra Medglobe – Your Trusted Partner for Medical Travel to India</title>
        <meta name="description" content="Hayatra Medglobe connects international patients with India's leading hospitals and expert doctors. We provide seamless, end-to-end support for your medical journey, ensuring quality care with compassion." />
        <meta name="keywords" content="medical tourism India, healthcare travel India, affordable treatment, top hospitals India, expert doctors India" />
      </Helmet>
      
      <section className="relative bg-light-bg">
        <div className="absolute inset-0">
             <img alt="A smiling doctor of Indian descent consulting with a happy international patient in a modern, bright hospital setting." className="w-full h-full object-cover"  src="https://images.unsplash.com/photo-1584516150909-c43483ee7932" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-cyan-50/60 backdrop-blur-sm"></div>
        </div>
        <div className="relative container mx-auto px-4 min-h-[90vh] flex items-center">
            <div className="grid lg:grid-cols-5 gap-16 items-center w-full">
                <motion.div 
                    className="lg:col-span-3 text-center lg:text-left py-12"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="mb-6 leading-tight">
                        {t('heroTagline')}
                    </h1>
                    <p className="text-lg mb-8 text-justify-custom">
                        {t('heroDescription')}
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 mb-10">
                        <div className="flex items-center gap-2 text-slate-700 font-semibold"><FileText className="h-5 w-5 text-primary-green"/> Visa Assistance</div>
                        <div className="flex items-center gap-2 text-slate-700 font-semibold"><Languages className="h-5 w-5 text-primary-green"/> Language Support</div>
                        <div className="flex items-center gap-2 text-slate-700 font-semibold"><Award className="h-5 w-5 text-primary-green"/> Top-Tier Hospitals</div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link to="/get-quote">
                            <Button className="btn-primary rounded-full text-lg px-8 py-4 w-full sm:w-auto">
                                <Stethoscope className="h-5 w-5 me-2"/> {t('getFreeQuote')}
                            </Button>
                        </Link>
                        <a href="https://wa.me/917092455157" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white rounded-full text-lg px-8 py-4 w-full sm:w-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 me-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> {t('chatOnWhatsApp')}
                            </Button>
                        </a>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="lg:col-span-2"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <FreeEvaluationForm />
                </motion.div>
            </div>
        </div>
      </section>

      <section id="how-it-works" className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="mb-4">Your Healing Journey, Simplified</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-light-bg p-8 rounded-2xl shadow-lg border border-slate-100 text-center text-justify-custom">
                <div className="bg-primary-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-center">{step.title}</h3>
                <p className="text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
           <div className="text-center mt-16">
            <Link to="/how-it-works">
              <Button className="btn-primary text-lg px-8 py-4 rounded-full">Learn More About Our Process</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-light-bg">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="mb-4">{t('featuredTreatments')}</h2>
            <p className="text-lg max-w-3xl mx-auto text-justify-custom">Access advanced medical care with trusted specialists at affordable prices.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topTreatments.map((treatment, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white p-6 rounded-2xl shadow-lg card-hover border border-slate-100">
                <h3 className="text-xl">{treatment.name}</h3>
                <p className="text-slate-500 text-sm mb-4 text-left">{treatment.category}</p>
                <p className="text-lg font-semibold text-primary-green text-left">Starting From: <span className="font-bold">{treatment.cost}</span></p>
                <Link to={`/treatments/${treatment.category.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`}>
                  <Button variant="link" className="p-0 h-auto mt-4 text-primary-blue">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/treatments"><Button className="btn-secondary text-lg px-8 py-4 rounded-full">{t('viewAllTreatments')}</Button></Link>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="mb-4">{t('topHospitals')}</h2>
            <p className="text-lg max-w-3xl mx-auto text-justify-custom">{t('topHospitalsDesc')}</p>
          </motion.div>
          <Carousel opts={{ align: "start", loop: true, }} className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {topHospitals.map((hospital, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3"><div className="p-1">
                    <Link to={`/hospitals/${hospital.slug}`}>
                      <div className="bg-white rounded-2xl shadow-lg card-hover border border-slate-100 overflow-hidden h-full flex flex-col">
                        <img alt={hospital.name} className="w-full h-48 object-cover" src={hospital.image} />
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl">{hospital.name}</h3>
                          <p className="text-slate-500 mb-2 text-left">{hospital.location}</p>
                          <div className="flex gap-2 mb-4">
                            {hospital.accreditations.includes("NABH") && <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">NABH</span>}
                            {hospital.accreditations.includes("JCI") && <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded-full">JCI</span>}
                          </div>
                          <Button variant="link" className="mt-auto p-0 h-auto justify-start text-primary-green">View Profile <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </div>
                      </div>
                    </Link>
                </div></CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white hover:bg-slate-100 text-dark-blue" /><CarouselNext className="bg-white hover:bg-slate-100 text-dark-blue" />
          </Carousel>
           <div className="text-center mt-16">
            <Link to="/hospitals"><Button className="btn-primary text-lg px-8 py-4 rounded-full">View All Hospitals</Button></Link>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-light-bg">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="mb-4">{t('leadingDoctors')}</h2>
            <p className="text-lg max-w-3xl mx-auto text-justify-custom">{t('leadingDoctorsDesc')}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadingDoctors.map((doctor, index) => (
              <Link to={`/doctors/${doctor.slug}`} key={doctor.slug}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl shadow-lg card-hover border border-slate-100 overflow-hidden h-full flex flex-col items-center p-6 text-center">
                  <div className="w-32 h-40 mb-4 rounded-lg overflow-hidden border-4 border-primary-green/20">
                    <img alt={doctor.name} className="w-full h-full object-cover" src={doctor.image || defaultDoctorImage} />
                  </div>
                  <h3 className="text-xl">{doctor.name}</h3>
                  <p className="text-primary-green font-semibold mt-1">{doctor.specialty}</p>
                  <p className="text-slate-600 text-sm mt-2">{doctor.experience} Experience</p>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/doctors"><Button className="btn-secondary text-lg px-8 py-4 rounded-full">{t('viewAllDoctors')}</Button></Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="mb-4">Real Patients, Real Recoveries</h2>
            <p className="text-lg max-w-3xl mx-auto text-justify-custom">{t('patientStoriesDesc')}</p>
          </motion.div>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {patientStories.map((item, index) => (
                <CarouselItem key={index}><div className="p-1">
                    <div className="bg-light-bg p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
                      <p className="text-slate-600 italic text-lg mb-6 text-justify-custom">"{item.story}"</p>
                      <div className="flex items-center justify-center">
                        <img alt={item.name} className="w-12 h-12 rounded-full object-cover me-4" src="https://images.unsplash.com/photo-1571302171879-0965db383dc4" />
                        <div>
                          <p className="font-bold text-dark-blue text-left">{item.name} <span className="text-xl">{item.flag}</span></p>
                          <p className="text-sm text-slate-500 text-left">{item.country}</p>
                        </div>
                      </div>
                    </div>
                </div></CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white hover:bg-slate-100 text-dark-blue -left-4" /><CarouselNext className="bg-white hover:bg-slate-100 text-dark-blue -right-4" />
          </Carousel>
          <div className="text-center mt-12">
            <Link to="/patient-stories"><Button variant="link" className="text-primary-blue text-lg">Watch More Patient Stories <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-bg">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="mb-4">{t('whyChooseUs')}</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-center gap-4">
                <div className="bg-primary-green/10 text-primary-green p-3 rounded-full">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="font-semibold text-dark-blue text-lg">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/get-quote"><Button className="btn-primary text-lg px-8 py-4 rounded-full">Get a Free Medical Opinion</Button></Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="mb-4">Stay Informed, Stay Healthy</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={post.link}>
                  <div className="bg-light-bg rounded-2xl shadow-lg card-hover border border-slate-100 overflow-hidden h-full flex flex-col">
                    <img alt={post.title} className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1601941707251-5a887e9db2e1" />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg mb-4 flex-grow">{post.title}</h3>
                      <Button variant="link" className="p-0 h-auto justify-start text-primary-green">Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/knowledge"><Button className="btn-secondary text-lg px-8 py-4 rounded-full">Explore Our Health Insights</Button></Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-bg">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-4">{t('readyToStart')}</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-justify-custom">{t('getPersonalizedRecs')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/get-quote"><Button className="btn-primary text-lg px-8 py-4 rounded-full w-full sm:w-auto">Send Enquiry</Button></Link>
              <a href="https://wa.me/917092455157" target="_blank" rel="noopener noreferrer">
                <Button className="btn-secondary text-lg px-8 py-4 rounded-full w-full sm:w-auto">{t('chatOnWhatsApp')}</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;