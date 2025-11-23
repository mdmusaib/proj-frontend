import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Plane, ShieldCheck, Globe, Users, Award, Stethoscope, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import FreeEvaluationForm from '@/components/FreeEvaluationForm';

const AboutPage = () => {
    const { t } = useLanguage();

    const services = [
        { Icon: Stethoscope, title: "Medical Opinion & Cost Estimates", description: "Get a detailed medical opinion from India’s top specialists before you travel." },
        { Icon: Globe, title: "Visa & Travel Assistance", description: "Full support for Medical Visa processing, invitation letters, and document coordination." },
        { Icon: Award, title: "Hospital Admissions & Coordination", description: "Direct access to NABH & JCI-accredited hospitals, ensuring priority admission." },
        { Icon: Plane, title: "Accommodation & Transportation", description: "We arrange safe, budget-friendly stays and handle all local transfers for you." },
        { Icon: Users, title: "Interpreter Services", description: "We offer English & Arabic interpreters to ensure smooth communication." },
        { Icon: ShieldCheck, title: "Post-Treatment Follow-up", description: "We facilitate your recovery with follow-up consultations and guidance." },
    ];

    const nameMeanings = [
      { Icon: Heart, term: "Hayat", meaning: "Life & well-being" },
      { Icon: Plane, term: "Yatra", meaning: "Journey & travel" },
      { Icon: Stethoscope, term: "Med", meaning: "Medicine & care" },
      { Icon: Globe, term: "Globe", meaning: "Worldwide connection" },
    ];

    return (
        <>
            <Helmet>
                <title>About Hayatra Medglobe | Your Medical Tourism Partner in India</title>
                <meta name="description" content="Hayatra Medglobe connects international patients with India’s top hospitals, offering end-to-end healthcare facilitation and travel support." />
                <meta name="keywords" content="medical tourism India, affordable healthcare in India, best hospitals for foreigners in India, about Hayatra Medglobe" />
            </Helmet>

            <motion.section 
                className="relative bg-cover bg-center py-32 md:py-48"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-cyan-50/70 to-blue-100/60 backdrop-blur-sm"></div>
                <div className="relative container mx-auto px-4 text-center">
                    <motion.h1 
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Your Journey of Life, Health, and Hope — Begins Here.
                    </motion.h1>
                    <motion.p 
                        className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-justify-custom"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Every journey starts with hope — and at Hayatra Medglobe, we turn that hope into healing.
                    </motion.p>
                    <motion.div 
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link to="/get-quote">
                            <Button className="btn-primary rounded-full text-lg px-8 py-4">Start Your Consultation</Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
            
            <section className="section-padding bg-white">
              <div className="container mx-auto px-4">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                          <h2 className="mb-6">Who We Are</h2>
                          <div className="text-justify-custom text-lg">
                            <p>We are more than a healthcare facilitator — we are your partners in healing.</p>
                            <p>Our team of dedicated coordinators, medical experts, and multilingual support professionals guide you through every step — from your first consultation to your successful recovery and return home.</p>
                            <p>Serving patients from the Middle East, Africa, and Asia, we bridge the gap between international patients and trusted Indian healthcare providers.</p>
                          </div>
                      </motion.div>
                       <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                          <img alt="A friendly care coordinator assisting a patient in a modern hospital hallway" className="rounded-2xl shadow-xl w-full h-full object-cover" src="https://images.unsplash.com/photo-1701605926170-b756af9fa0b8" />
                      </motion.div>
                  </div>
              </div>
            </section>
            
            <section className="section-padding bg-light-bg">
                <div className="container mx-auto px-4">
                     <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                          <h2 className="mb-4">Our Purpose</h2>
                          <p className="text-lg max-w-4xl mx-auto text-justify-custom">The name Hayatra Medglobe reflects our mission and values:</p>
                      </motion.div>
                     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {nameMeanings.map((item, index) => (
                          <motion.div 
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="bg-white text-primary-green w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border">
                              <item.Icon className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl">{item.term}</h3>
                            <p>{item.meaning}</p>
                          </motion.div>
                        ))}
                      </div>
                      <motion.p 
                          className="text-lg max-w-4xl mx-auto text-center mt-12 text-justify-custom"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                            Together, it means: “A journey of life and health through medicine, connecting people worldwide.”
                      </motion.p>
                </div>
            </section>

             <section className="section-padding bg-white">
                <div className="container mx-auto px-4">
                    <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="mb-4">What We Offer</h2>
                        <p className="text-lg max-w-3xl mx-auto text-justify-custom">We provide complete, end-to-end medical tourism services — all at no extra cost to the patient.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-light-bg p-8 rounded-2xl shadow-md card-hover border border-slate-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="bg-primary-green/10 p-4 rounded-full mb-6 w-fit">
                                  <service.Icon className="h-8 w-8 text-primary-green" />
                                </div>
                                <h3 className="text-xl mb-3">{service.title}</h3>
                                <p className="flex-grow text-justify-custom">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-light-bg">
                <div className="container mx-auto px-4">
                    <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="mb-4">Why Choose Hayatra Medglobe</h2>
                        <p className="text-lg max-w-3xl mx-auto text-justify-custom">Thousands of patients from across 30+ countries trust Hayatra Medglobe for their healthcare journeys.</p>
                    </motion.div>
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl text-primary-blue mb-4">Our Promise:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center text-lg"><ShieldCheck className="h-6 w-6 text-primary-green me-3" />Partnered with NABH & JCI Accredited Hospitals</li>
                                <li className="flex items-center text-lg"><ShieldCheck className="h-6 w-6 text-primary-green me-3" />Transparent Pricing (No Hidden Costs)</li>
                                <li className="flex items-center text-lg"><ShieldCheck className="h-6 w-6 text-primary-green me-3" />24x7 Dedicated Support</li>
                                <li className="flex items-center text-lg"><ShieldCheck className="h-6 w-6 text-primary-green me-3" />Personalized Case Managers</li>
                                <li className="flex items-center text-lg"><ShieldCheck className="h-6 w-6 text-primary-green me-3" />Trusted Across Africa, Middle East & South Asia</li>
                            </ul>
                        </div>
                        <div className="text-center flex flex-wrap gap-4 justify-center">
                            <span className="text-4xl" title="Nigeria">🇳🇬</span>
                            <span className="text-4xl" title="Oman">🇴🇲</span>
                            <span className="text-4xl" title="Kenya">🇰🇪</span>
                            <span className="text-4xl" title="United Arab Emirates">🇦🇪</span>
                            <span className="text-4xl" title="Bangladesh">🇧🇩</span>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="section-padding bg-gradient-to-br from-blue-50 to-green-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="lg:pr-10">
                            <h2 className="mb-4">Let's Begin Your Journey</h2>
                            <p className="text-lg mb-6 text-justify-custom">Get a free treatment estimate or speak with our multilingual care team today.</p>
                            <div className="space-y-4 text-slate-700">
                                <p className="flex items-center"><Phone className="h-5 w-5 me-3 text-primary-green"/> Shiza (English): +91 70924 55157</p>
                                <p className="flex items-center"><Phone className="h-5 w-5 me-3 text-primary-green"/> Sufi (Arabic): +91 97165 11527</p>
                                <p className="flex items-center"><Mail className="h-5 w-5 me-3 text-primary-green"/> hayatramedglobe@gmail.com</p>
                                <p className="flex items-center"><Globe className="h-5 w-5 me-3 text-primary-green"/> India – 122001</p>
                            </div>
                        </div>
                        <div>
                            <FreeEvaluationForm title="Send us your medical query" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;