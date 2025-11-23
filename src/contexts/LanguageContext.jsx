import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('hayatra-language');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('hayatra-language', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };
  
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);


  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    home: 'Home',
    about: 'About Us',
    treatments: 'Treatments',
    hospitals: 'Hospitals',
    doctors: 'Doctors',
    services: 'Our Services',
    costPackages: 'Cost & Packages',
    howItWorks: 'How It Works',
    patientStories: 'Patient Stories',
    knowledge: 'Health Insights',
    contact: 'Contact Us',
    getQuote: 'Get a Quote',
    getFreeQuote: 'Get a Free Quote',
    getFreeTreatmentQuote: 'Get a Free Treatment Quote',
    chatOnWhatsApp: 'Chat on WhatsApp',
    emailUs: 'Email Us',
    
    heroTitlePlatform: 'Your Trusted Partner for Medical Travel to India',
    heroTagline: 'Connecting Life, Health & Care Across Borders.',
    heroDescription: 'From expert medical opinions to post-treatment care, we are your trusted partners in your journey towards wellness. We serve patients from over 30 countries, ensuring a seamless and compassionate healthcare experience.',
    
    whyChooseUs: 'Why Choose Hayatra Medglobe?',
    affordableCare: 'Affordable Excellence',
    affordableDesc: 'Access world-class hospitals and treatments at a fraction of global costs.',
    personalizedSupport: 'Personalized Support',
    personalizedDesc: 'Dedicated guidance throughout your entire medical journey.',
    globalReach: 'Global Patient Care',
    multiLanguageDesc: 'Multi-language support for seamless and clear communication.',
    trustAndTransparency: 'Trust & Transparency',
    trustedPartnersDesc: 'A network of JCI/NABH accredited hospitals and board-certified doctors.',
    
    ourServices: 'Our Comprehensive Services',
    servicesPageDesc: 'We provide complete, end-to-end support to ensure your medical journey is simple, safe, and stress-free.',
    freeTreatmentQuote: 'Medical Opinion & Quote',
    freeTreatmentQuoteDesc: 'Receive detailed treatment plans and transparent cost estimates from top hospitals within 24-48 hours.',
    doctorConsultation: 'Expert Doctor Consultation',
    doctorConsultationDesc: 'We arrange tele-consultations with leading specialists, helping you make informed health decisions.',
    visaAssistance: 'Visa & Travel Assistance',
    visaAssistanceDesc: 'Our team provides visa invitation letters and coordinates your travel arrangements for a smooth journey.',
    travelAndStay: 'Comfortable Travel & Stay',
    travelAndStayDesc: 'We handle airport logistics and arrange safe, comfortable accommodation for you and your attendant.',
    postTreatmentCare: 'Post-Treatment Follow-Up',
    postTreatmentCareDesc: 'We facilitate follow-up consultations and ensure your recovery continues seamlessly back home.',
    endToEndSupport: 'End-to-End Case Management',
    endToEndSupportDesc: 'A dedicated case manager provides continuous, personalized support from arrival to departure.',

    featuredTreatments: 'Popular Medical Treatments',
    viewAllTreatments: 'View All Treatments',
    topHospitals: "Our Partner Hospitals",
    topHospitalsDesc: "We partner with India's most accredited and renowned hospitals to ensure world-class care.",
    viewDetails: "View Details",
    leadingDoctors: "Meet Our Expert Doctors",
    leadingDoctorsDesc: "Consult with India's top specialists, renowned for their clinical excellence and compassionate care.",
    viewAllDoctors: "View All Doctors",
    patientStoriesDesc: "Hear from those who entrusted us with their healthcare journey.",
    faqs: "Frequently Asked Questions",
    viewMoreFaqs: "View More FAQs",
    readyToStart: "Ready to Begin Your Journey to Health?",
    getPersonalizedRecs: "Get personalized treatment recommendations and cost estimates from India's top hospitals. Our services are always free for patients.",

    contactUs: 'Contact Us',
    getInTouch: 'Get in Touch With Us',
    getInTouchSubtitle: 'We are here to help and answer any questions you may have. We look forward to hearing from you.',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone / WhatsApp Number',
    message: 'Your Message',
    send: 'Send Message',
    
    forEnglish: 'For English',
    forArabic: 'For Arabic',
    
    quickLinks: 'Quick Links',
    popularTreatments: 'Popular Treatments',
    organTransplant: 'Transplant & Advanced Surgeries',
    cancerCare: 'Cancer & Blood Disorders',
    cardiacSciences: 'Heart & Internal Medicine',
    neurosciences: 'Brain & Spine Care',
    orthopedics: 'Bone, Spine & Joint Care',
    ivfTreatment: 'Women’s Health & IVF',

    newsletter: 'Subscribe to Our Newsletter',
    yourEmail: 'Your email address',
    
    noteTitle: 'Important Note',
    noteDescription: 'Hayatra Medglobe is a medical travel facilitator and does not provide medical advice, diagnosis, or treatment. The information and services on this website are for informational purposes only and should not replace professional consultation from a qualified healthcare provider.',
    copyrightNotice: 'The content on this website is the intellectual property of Hayatra Medglobe. Unauthorized reproduction or duplication is strictly prohibited and will be subject to legal action.',
    allRightsReserved: 'All rights reserved',

    termsOfUse: 'Terms of Use',
    privacyPolicy: 'Privacy Policy',
    disclaimer: 'Disclaimer',

    getFreeEvaluation: 'Get a Free Medical Evaluation',
    treatmentPlanQuote: 'Request a Free Treatment Plan & Quote',
    patientName: 'Patient\'s Full Name',
    selectCountry: 'Select Your Country',
    enterCity: 'Enter City',
    enterPhoneNumber: 'Enter Phone / WhatsApp Number',
    ageOrDobPlaceholder: 'Age / Date of Birth',
    describeMedicalProblem: 'Briefly describe the medical condition...',
    submitting: 'Submitting...',
    contactUsNow: 'Submit Your Enquiry',
    bySubmittingAgreeTo: 'By submitting, you agree to our',

    topDoctorsInIndia: 'Top Doctors in India',
    findLeadingDoctorsDescription: "Find and consult with leading doctors and specialists from India's best hospitals.",
    consultWithIndiasRenowned: "Consult with India's most renowned medical experts, celebrated for their clinical excellence and compassionate patient care.",
    searchDoctors: 'Search by doctor, specialty, or hospital...',
    searchTreatments: 'Search for treatments or specialties...',
    viewProfile: 'View Profile',
    requestAnOpinion: 'Request an Opinion',
    bookAppointment: 'Request an Opinion',
    searchHospitals: 'Search by hospital name or location...',
    partnerHospitalsDesc: 'Our network includes internationally accredited hospitals known for excellence in patient care.',
    filterByCity: 'Filter by City',
    filterBySpecialty: 'Filter by Specialty',
    filterByAccreditation: 'Filter by Accreditation',
    allCities: 'All Cities',
    allSpecialties: 'All Specialties',
    allAccreditations: 'All Accreditations',
    resetFilters: 'Reset Filters',
    treatment: 'Treatment',
    category: 'Category',
    description: 'Description',
    cost: 'Indicative Cost (USD)',
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    treatments: 'العلاجات',
    hospitals: 'المستشفيات',
    doctors: 'الأطباء',
    services: 'خدماتنا',
    costPackages: 'التكلفة والباقات',
    howItWorks: 'كيف نعمل',
    patientStories: 'قصص المرضى',
    knowledge: 'رؤى صحية',
    contact: 'اتصل بنا',
    getQuote: 'احصل على عرض أسعار',
    getFreeQuote: 'احصل على عرض أسعار مجاني',
    getFreeTreatmentQuote: 'احصل على عرض أسعار مجاني للعلاج',
    chatOnWhatsApp: 'الدردشة على الواتساب',
    emailUs: 'راسلنا عبر البريد الإلكتروني',

    heroTitlePlatform: 'شريكك الموثوق للسفر الطبي إلى الهند',
    heroTagline: 'نصل الحياة، الصحة، والرعاية عبر الحدود.',
    heroDescription: 'من آراء الخبراء الطبيين إلى رعاية ما بعد العلاج، نحن شركاؤك الموثوقون في رحلتك نحو العافية. نخدم مرضى من أكثر من 30 دولة، ونضمن تجربة رعاية صحية سلسة ومفعمة بالتعاطف.',
    
    whyChooseUs: 'لماذا تختار هياترا ميدجلوب؟',
    affordableCare: 'تميز بتكلفة معقولة',
    affordableDesc: 'الوصول إلى مستشفيات وعلاجات عالمية المستوى بجزء بسيط من التكاليف العالمية.',
    personalizedSupport: 'دعم شخصي',
    personalizedDesc: 'إرشاد مخصص طوال رحلتك الطبية بأكملها.',
    globalReach: 'رعاية عالمية للمرضى',
    multiLanguageDesc: 'دعم متعدد اللغات لتواصل سلس وواضح.',
    trustAndTransparency: 'الثقة والشفافية',
    trustedPartnersDesc: 'شبكة من المستشفيات المعتمدة من JCI/NABH والأطباء المعتمدين.',

    ourServices: 'خدماتنا الشاملة',
    servicesPageDesc: 'نحن نقدم دعمًا كاملاً وشاملاً لضمان أن تكون رحلتك الطبية بسيطة وآمنة وخالية من الإجهاد.',
    freeTreatmentQuote: 'رأي طبي وعرض أسعار',
    freeTreatmentQuoteDesc: 'احصل على خطط علاج مفصلة وتقديرات تكلفة شفافة من أفضل المستشفيات في غضون 24-48 ساعة.',
    doctorConsultation: 'استشارة طبيب خبير',
    doctorConsultationDesc: 'نرتب استشارات عن بعد مع كبار المتخصصين، مما يساعدك على اتخاذ قرارات صحية مستنيرة.',
    visaAssistance: 'المساعدة في التأشيرة والسفر',
    visaAssistanceDesc: 'يقدم فريقنا خطابات دعوة للتأشيرة الطبية وينسق ترتيبات سفرك لرحلة سلسة.',
    travelAndStay: 'سفر وإقامة مريحة',
    travelAndStayDesc: 'نتولى الخدمات اللوجستية في المطار ونرتب إقامة آمنة ومريحة لك وللمرافق.',
    postTreatmentCare: 'متابعة ما بعد العلاج',
    postTreatmentCareDesc: 'نسهل استشارات المتابعة ونضمن استمرار تعافيك بسلاسة في بلدك.',
    endToEndSupport: 'إدارة شاملة للحالة',
    endToEndSupportDesc: 'يقدم مدير حالة مخصص دعمًا مستمرًا وشخصيًا من الوصول حتى المغادرة.',

    featuredTreatments: 'العلاجات الطبية الشائعة',
    viewAllTreatments: 'عرض جميع العلاجات',
    topHospitals: "المستشفيات الشريكة لنا",
    topHospitalsDesc: "نتعاون مع أكثر المستشفيات شهرة واعتمادًا في الهند لضمان رعاية عالمية المستوى.",
    viewDetails: "عرض التفاصيل",
    leadingDoctors: "تعرف على أطبائنا الخبراء",
    leadingDoctorsDesc: "استشر كبار المتخصصين في الهند، المشهورين بتميزهم السريري ورعايتهم الرحيمة.",
    viewAllDoctors: "عرض كل الأطباء",
    patientStoriesDesc: "استمع إلى أولئك الذين وثقوا بنا في رحلتهم الصحية.",
    faqs: "الأسئلة الشائعة",
    viewMoreFaqs: "عرض المزيد من الأسئلة الشائعة",
    readyToStart: "هل أنت مستعد لبدء رحلتك نحو الصحة؟",
    getPersonalizedRecs: "احصل على توصيات علاجية مخصصة وتقديرات للتكاليف من أفضل المستشفيات في الهند. خدماتنا دائمًا مجانية للمرضى.",

    contactUs: 'اتصل بنا',
    getInTouch: 'تواصل معنا',
    getInTouchSubtitle: 'نحن هنا للمساعدة والإجابة على أي سؤال قد يكون لديك. نتطلع إلى الاستماع منك.',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف / واتساب',
    message: 'رسالتك',
    send: 'إرسال الرسالة',
    
    forEnglish: 'للغة الإنجليزية',
    forArabic: 'للغة العربية',

    quickLinks: 'روابط سريعة',
    popularTreatments: 'العلاجات الشائعة',
    organTransplant: 'زراعة الأعضاء والجراحات المتقدمة',
    cancerCare: 'أمراض السرطان والدم',
    cardiacSciences: 'أمراض القلب والطب الباطني',
    neurosciences: 'أمراض الدماغ والعمود الفقري',
    orthopedics: 'أمراض العظام والمفاصل',
    ivfTreatment: 'صحة المرأة وأطفال الأنابيب',

    newsletter: 'اشترك في نشرتنا الإخبارية',
    yourEmail: 'عنوان بريدك الإلكتروني',
    
    noteTitle: 'ملاحظة هامة',
    noteDescription: 'هياترا ميدجلوب هي ميسر للسفر الطبي ولا تقدم المشورة الطبية أو التشخيص أو العلاج. المعلومات والخدمات على هذا الموقع هي لأغراض إعلامية فقط ولا ينبغي أن تحل محل الاستشارة المهنية من مقدم رعاية صحية مؤهل.',
    copyrightNotice: 'محتوى هذا الموقع هو ملكية فكرية لشركة هياترا ميدجلوب. يُحظر تمامًا النسخ أو الاستنساخ غير المصرح به وسيخضع لإجراءات قانونية.',
    allRightsReserved: 'كل الحقوق محفوظة',

    termsOfUse: 'شروط الاستخدام',
    privacyPolicy: 'سياسة الخصوصية',
    disclaimer: 'إخلاء المسؤولية',

    getFreeEvaluation: 'احصل على تقييم طبي مجاني',
    treatmentPlanQuote: 'اطلب خطة علاج وعرض أسعار مجاني',
    patientName: 'اسم المريض الكامل',
    selectCountry: 'اختر بلدك',
    enterCity: 'أدخل المدينة',
    enterPhoneNumber: 'أدخل رقم الهاتف / واتساب',
    ageOrDobPlaceholder: 'العمر / تاريخ الميلاد',
    describeMedicalProblem: 'صف بإيجاز الحالة الطبية...',
    submitting: 'جارٍ الإرسال...',
    contactUsNow: 'أرسل استفسارك',
    bySubmittingAgreeTo: 'بالإرسال، فإنك توافق على',

    topDoctorsInIndia: 'أفضل الأطباء في الهند',
    findLeadingDoctorsDescription: 'ابحث واستشر كبار الأطباء والمتخصصين من أفضل المستشفيات في الهند.',
    consultWithIndiasRenowned: 'استشر أشهر الخبراء الطبيين في الهند، المشهورين بتميزهم السريري ورعايتهم الرحيمة للمرضى.',
    searchDoctors: 'ابحث بالاسم، التخصص، أو المستشفى...',
    searchTreatments: 'ابحث عن العلاجات أو التخصصات...',
    viewProfile: 'عرض الملف الشخصي',
    requestAnOpinion: 'طلب رأي طبي',
    bookAppointment: 'طلب رأي طبي',
    searchHospitals: 'ابحث باسم المستشفى أو الموقع...',
    partnerHospitalsDesc: 'تشمل شبكتنا مستشفيات معتمدة دوليًا ومعروفة بالتميز في رعاية المرضى.',
    filterByCity: 'تصفية حسب المدينة',
    filterBySpecialty: 'تصفية حسب التخصص',
    filterByAccreditation: 'تصفية حسب الاعتماد',
    allCities: 'كل المدن',
    allSpecialties: 'جميع التخصصات',
    allAccreditations: 'جميع الاعتمادات',
    resetFilters: 'إعادة تعيين المرشحات',
    treatment: 'العلاج',
    category: 'الفئة',
    description: 'الوصف',
    cost: 'التكلفة الإرشادية (بالدولار الأمريكي)',
  }
};