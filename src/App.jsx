import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppChatWidget from '@/components/WhatsAppChatWidget';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const TreatmentsPage = lazy(() => import('@/pages/TreatmentsPage'));
const AdminTreatmentsPage = lazy(() => import('@/pages/AdminTreatmentsPage'));
const TreatmentSubPage = lazy(() => import('@/pages/TreatmentSubPage'));
const HospitalsPage = lazy(() => import('@/pages/HospitalsPage'));
const AdminDoctorsPage = lazy(() => import('@/pages/AdminDoctorsPage'));
const AdminHospitalsPage = lazy(() => import('@/pages/AdminHospitalsPage'));
const HospitalDetailPage = lazy(() => import('@/pages/HospitalDetailPage'));
const DoctorsPage = lazy(() => import('@/pages/DoctorsPage'));
const DoctorDetailPage = lazy(() => import('@/pages/DoctorDetailPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const PatientStoriesPage = lazy(() => import('@/pages/PatientStoriesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const TermsOfUsePage = lazy(() => import('@/pages/TermsOfUsePage'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));
const DisclaimerPage = lazy(() => import('@/pages/DisclaimerPage'));
const KnowledgePage = lazy(() => import('@/pages/KnowledgePage'));
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'));
const CostPackagesPage = lazy(() => import('@/pages/CostPackagesPage'));
const ArticleDetailPage = lazy(() => import('@/pages/ArticleDetailPage'));
const FaqsPage = lazy(() => import('@/pages/FaqsPage'));

function App() {
  const newLogoUrl = "https://horizons-cdn.hostinger.com/d7d4f7ab-c127-457e-aed8-00842d15e9d6/c4ef236f0bb6220b531672dc9922a13e.png";
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-light-bg">
            <Helmet>
              <link rel="icon" type="image/png" href={newLogoUrl} />
              <title>Hayatra Medglobe - Your Trusted Partner for Medical Travel to India</title>
              <meta name="description" content="Hayatra Medglobe connects international patients with India's leading hospitals and expert doctors. We provide seamless, end-to-end support for your medical journey, ensuring quality care with compassion." />
              <script type="application/ld+json">
                {`
                  {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Hayatra Medglobe",
                    "url": "https://www.hayatramedglobe.com",
                    "logo": "${newLogoUrl}",
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "telephone": "+91-70924-55157",
                      "contactType": "Customer Service",
                      "areaServed": "Worldwide"
                    },
                    "sameAs": [
                      "https://x.com",
                      "https://linkedin.com",
                      "https://instagram.com",
                      "https://youtube.com"
                    ]
                  }
                `}
              </script>
            </Helmet>
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/treatments" element={<TreatmentsPage />} />
                  <Route path="/treatments/:slug" element={<TreatmentSubPage />} />
                  <Route path="/hospitals" element={<HospitalsPage />} />
                  <Route path="/hospitals/:slug" element={<HospitalDetailPage />} />
                  <Route path="/doctors" element={<DoctorsPage />} />
                  <Route path="/doctors/:slug" element={<DoctorDetailPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/patient-stories" element={<PatientStoriesPage />} />
                  <Route path="/knowledge" element={<KnowledgePage />} />
                  <Route path="/knowledge/:slug" element={<ArticleDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/get-quote" element={<ContactPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/cost-packages" element={<CostPackagesPage />} />
                  <Route path="/terms-of-use" element={<TermsOfUsePage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/disclaimer" element={<DisclaimerPage />} />
                  <Route path="/faqs" element={<FaqsPage />} />
         
         import ProtectedRoute from "@/components/ProtectedRoute";

<Route
  path="admin/hospitals"
  element={
    <ProtectedRoute>
      <AdminHospitalsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="admin/treatments"
  element={
    <ProtectedRoute>
      <AdminTreatmentsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="admin/doctors"
  element={
    <ProtectedRoute>
      <AdminDoctorsPage />
    </ProtectedRoute>
  }
/>

            <Route path="/admin/login" element={<AdminLogin />} />


                </Routes>
              </Suspense>
            </main>
            <Footer />
            <WhatsAppChatWidget />
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;