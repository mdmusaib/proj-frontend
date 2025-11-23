import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TermsOfUsePage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Use - Hayatra Medglobe</title>
        <meta name="description" content="Review the Terms of Use for Hayatra Medglobe's website and services. Your access and use of the service is conditioned on your acceptance of these terms." />
      </Helmet>

      <div className="bg-light-bg py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-100"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-dark-blue text-center">Terms of Use</h1>
            
            <div className="prose prose-lg max-w-none text-slate-700">
              <p>Welcome to Hayatra Medglobe. These terms and conditions outline the rules and regulations for the use of Hayatra Medglobe's Website, located at www.hayatramedglobe.com.</p>
              <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Hayatra Medglobe if you do not agree to take all of the terms and conditions stated on this page.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">1. Intellectual Property Rights</h2>
              <p>Other than the content you own, under these Terms, Hayatra Medglobe and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">2. Restrictions</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul>
                <li>publishing any Website material in any other media;</li>
                <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                <li>publicly performing and/or showing any Website material;</li>
                <li>using this Website in any way that is or may be damaging to this Website;</li>
                <li>using this Website in any way that impacts user access to this Website;</li>
                <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">3. No warranties</h2>
              <p>This Website is provided "as is," with all faults, and Hayatra Medglobe express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">4. Limitation of liability</h2>
              <p>In no event shall Hayatra Medglobe, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Hayatra Medglobe, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">5. Governing Law & Jurisdiction</h2>
              <p>These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUsePage;