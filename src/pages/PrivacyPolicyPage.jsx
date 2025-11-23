import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Hayatra Medglobe</title>
        <meta name="description" content="Read the Privacy Policy for Hayatra Medglobe to understand how we collect, use, and protect your personal and medical information." />
      </Helmet>

      <div className="bg-light-bg py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-100"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-dark-blue text-center">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-slate-700">
              <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">Information We Collect</h2>
              <p>We may collect several types of information from and about users of our Website, including:</p>
              <ul>
                <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to: Email address, First name and last name, Phone number, and Usage Data.</li>
                <li><strong>Medical Information:</strong> To facilitate medical consultations and treatment plans, we may collect medical reports and health information that you voluntarily provide. This information is treated with the highest level of confidentiality.</li>
                <li><strong>Usage Data:</strong> Usage Data is collected automatically when using the Service. This may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">How We Use Your Information</h2>
              <p>We use the information we collect for various purposes:</p>
              <ul>
                <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
                <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                <li>To provide You with news, special offers and general information about other goods, services and events which we offer.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">Security of Your Personal Data</h2>
              <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-primary-blue">Changes to this Privacy Policy</h2>
              <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;