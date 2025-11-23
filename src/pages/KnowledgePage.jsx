import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import Breadcrumb from '@/components/Breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const KnowledgePage = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const articles = [
        {
            slug: 'understanding-cardiac-bypass-surgery',
            title: 'Understanding Cardiac Bypass Surgery: A Patient\'s Guide',
            category: 'Heart & Internal Medicine',
            excerpt: 'Learn about the process, benefits, and recovery of one of the most common heart procedures.',
            image: 'A compassionate surgeon explaining a heart model to a patient.',
            date: '2025-10-28',
        },
        {
            slug: 'robotic-knee-replacement-in-india',
            title: 'The Rise of Robotic Knee Replacement in India',
            category: 'Bone, Spine & Joint Care',
            excerpt: 'Discover how robotic assistance is revolutionizing knee replacement surgery, offering precision and faster recovery.',
            image: 'A futuristic operating room with a robotic surgical arm over a knee model.',
            date: '2025-10-22',
        },
        {
            slug: 'navigating-cancer-treatment-abroad',
            title: 'Navigating Cancer Treatment Abroad: What to Expect',
            category: 'Cancer & Blood Disorders',
            excerpt: 'A comprehensive guide for international patients seeking oncology care in India, from diagnosis to post-treatment follow-up.',
            image: 'A hopeful patient talking with an oncologist in a bright, modern clinic.',
            date: '2025-10-15',
        },
    ];

    const faqs = [
      {
        question: "What is Hayatra Medglobe?",
        answer: "Hayatra Medglobe is a premier medical tourism company that connects international patients with India's leading hospitals and doctors. We provide end-to-end services, including personalized treatment plans, cost estimates, visa assistance, and logistical support, to ensure a seamless and stress-free healthcare experience."
      },
      {
        question: "How do you select your partner hospitals and doctors?",
        answer: "We partner exclusively with internationally accredited hospitals (JCI, NABH) and highly experienced, board-certified doctors. Our selection process involves a rigorous evaluation of clinical outcomes, patient safety standards, infrastructure, and patient feedback to ensure you receive world-class care."
      },
      {
        question: "Are your services free for patients?",
        answer: "Yes, our core services—including hospital and doctor recommendations, treatment quotes, and initial coordination—are completely free for patients. We have official partnerships with hospitals, which allows us to offer our assistance at no extra cost to you."
      },
      {
        question: "How can I get a cost estimate for my treatment?",
        answer: "You can get a free, no-obligation quote by filling out the 'Get Quote' form on our website. Please provide your medical reports and details of your condition. Our team will then liaise with multiple top hospitals to get you detailed treatment plans and competitive cost estimates within 24-48 hours."
      },
      {
        question: "What services are included in a typical medical tourism package?",
        answer: "Our comprehensive services include medical visa assistance, airport transfers, accommodation arrangements, scheduling of all medical appointments, a dedicated case manager, language interpretation services, and follow-up assistance after you return to your home country."
      },
       {
        question: "Why is India a preferred destination for medical treatment?",
        answer: "India offers a unique combination of world-class healthcare at a fraction of the cost found in Western countries. With state-of-the-art technology, internationally trained doctors, and minimal waiting times, India has become a global hub for high-quality, affordable medical care."
      }
    ];

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <title>Knowledge Hub - Hayatra Medglobe</title>
                <meta name="description" content="Explore articles and guides on medical treatments, patient stories, and healthcare in India. Stay informed with Hayatra Medglobe's knowledge hub." />
            </Helmet>

            <section className="bg-light-bg py-12 md:py-20">
                <div className="container mx-auto px-4">
                     <div className="mb-12">
                         <Breadcrumb items={[{ label: t('knowledge') }]} />
                     </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-dark-blue">
                            {t('knowledge')} Hub
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                            Stay informed with our latest articles, guides, and patient stories.
                        </p>

                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 py-6 text-lg rounded-full border-2 border-primary-green/30 focus:border-primary-green"
                            />
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article, index) => (
                            <motion.div
                                key={article.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover flex flex-col"
                            >
                                <Link to={`/knowledge/${article.slug}`}>
                                    <img className="w-full h-56 object-cover" alt={article.title} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                                </Link>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-sm text-slate-500 mb-2">
                                        <Tag className="h-4 w-4 mr-2 text-primary-green" />
                                        <span>{article.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-dark-blue mb-3 flex-grow">
                                        <Link to={`/knowledge/${article.slug}`} className="hover:text-primary-green transition-colors">
                                            {article.title}
                                        </Link>
                                    </h3>
                                    <p className="text-slate-600 mb-4 text-sm">{article.excerpt}</p>
                                    <Link to={`/knowledge/${article.slug}`} className="font-semibold text-primary-blue hover:underline self-start">
                                        Read More <ArrowRight className="inline h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>
            
            <section id="faqs" className="section-padding bg-white">
              <div className="container mx-auto px-4 max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-dark-blue">{t('faqs')}</h2>
                   <p className="text-lg text-slate-600">Your questions, answered. Find information about our process and services.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <Accordion type="single" collapsible className="w-full bg-light-bg p-4 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-semibold text-left text-slate-800 hover:no-underline">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed pt-2">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </div>
            </section>
        </>
    );
};

export default KnowledgePage;