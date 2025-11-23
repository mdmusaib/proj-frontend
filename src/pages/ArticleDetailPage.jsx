import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

// Dummy data, replace with actual data fetching
const articles = [
    {
        slug: 'understanding-cardiac-bypass-surgery',
        title: 'Understanding Cardiac Bypass Surgery: A Patient\'s Guide',
        category: 'Heart & Internal Medicine',
        content: '<p>Cardiac bypass surgery, also known as Coronary Artery Bypass Graft (CABG), is a common yet major surgical procedure to treat coronary artery disease. This guide will walk you through what to expect before, during, and after the surgery.</p><h2>What is Coronary Artery Disease?</h2><p>Coronary artery disease (CAD) occurs when the major blood vessels that supply your heart with blood, oxygen, and nutrients (coronary arteries) become damaged or diseased. Cholesterol-containing deposits (plaque) in your arteries and inflammation are usually to blame for CAD.</p><h2>The Procedure</h2><p>During CABG, a surgeon takes a healthy blood vessel from another part of your body — such as your leg, arm, or chest — and connects it to the other arteries in your heart so that blood is bypassed around the diseased or blocked area.</p>',
        image: 'A compassionate surgeon explaining a heart model to a patient.',
        date: '2025-10-28',
    },
    // Add other articles here
];

const ArticleDetailPage = () => {
    const { slug } = useParams();
    const { t } = useLanguage();
    const article = articles.find(a => a.slug === slug);

    if (!article) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Article not found</h1>
                <Link to="/knowledge" className="text-primary-blue hover:underline mt-4 inline-block">Back to Knowledge Hub</Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{article.title} - Hayatra Medglobe</title>
                <meta name="description" content={article.content.substring(0, 160)} />
            </Helmet>

            <section className="bg-light-bg py-12 md:py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <Breadcrumb items={[{ label: t('knowledge'), link: '/knowledge' }, { label: article.title }]} />
                    </div>

                    <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <img alt={article.title} class="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 shadow-lg" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                        
                        <div className="flex items-center text-sm text-slate-500 mb-4 space-x-4">
                            <div className="flex items-center">
                                <Tag className="h-4 w-4 mr-2 text-primary-green" />
                                <span>{article.category}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-primary-blue" />
                                <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-dark-blue mb-6">{article.title}</h1>
                        
                        <div
                            className="prose prose-lg max-w-none text-slate-700"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        <div className="mt-12">
                            <Link to="/knowledge" className="flex items-center font-semibold text-primary-blue hover:underline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Knowledge Hub
                            </Link>
                        </div>
                    </motion.article>
                </div>
            </section>
        </>
    );
};

export default ArticleDetailPage;