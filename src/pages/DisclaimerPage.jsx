import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const DisclaimerPage = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer - Hayatra Medglobe</title>
        <meta name="description" content="Disclaimer for Hayatra Medglobe. Understand the scope and limitations of the information provided on our website." />
      </Helmet>

      <div className="bg-light-bg py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-100"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-dark-blue text-center">Disclaimer</h1>
            
            <div className="prose prose-lg max-w-none text-slate-700">
              <p>The information provided by Hayatra Medglobe ("we," "us," or "our") on www.hayatramedglobe.com (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">Medical Disclaimer</h2>
              <p>The Site cannot and does not contain medical/health advice. The medical/health information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of medical/health advice. The use or reliance of any information contained on this site is solely at your own risk.</p>
              <p>Hayatra Medglobe is a medical tourism facilitator. We are not a healthcare provider. We connect patients with hospitals and doctors in India but do not offer medical advice, diagnosis, or treatment. Any medical decisions should be made in consultation with a qualified healthcare professional.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">External Links Disclaimer</h2>
              <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
              <p>We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">Testimonials Disclaimer</h2>
              <p>The Site may contain testimonials by users of our services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our services. We do not claim, and you should not assume, that all users will have the same experiences. Your individual results may vary.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DisclaimerPage;