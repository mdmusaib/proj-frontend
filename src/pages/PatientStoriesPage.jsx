import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { Quote, Star, Youtube } from 'lucide-react';
    import { useLanguage } from '@/contexts/LanguageContext';

    const PatientStoriesPage = () => {
      const { t } = useLanguage();

      const stories = [
        {
          name: 'Ahmed Al-Farsi',
          country: 'Oman',
          treatment: 'Cardiac Bypass Surgery',
          story: 'Hayatra Medglobe was a blessing. They handled everything from my visa to the hospital appointment. The doctors were excellent, and the care I received was better than I could have imagined. I am back home, healthy and grateful.',
          image: 'A smiling middle-aged man of Middle Eastern descent, looking healthy and happy.',
          rating: 5,
        },
        {
          name: 'Fatima Diallo',
          country: 'Nigeria',
          treatment: 'Knee Replacement',
          story: 'I was in constant pain and couldn’t walk properly. The team at Hayatra found me the perfect surgeon in India. The cost was affordable, and now I can walk pain-free. Thank you for giving me my life back!',
          image: 'A cheerful African woman in her 60s, walking outdoors.',
          rating: 5,
        },
        {
          name: 'John Miller',
          country: 'USA',
          treatment: 'Dental Implants',
          story: 'The cost of dental work in the US was too high. I found Hayatra Medglobe online and they arranged everything for my trip to India. The quality of care was top-notch, and I saved thousands of dollars. Highly recommended!',
          image: 'A Caucasian man in his 50s with a perfect, bright smile.',
          rating: 5,
        },
      ];

      const videoTestimonials = [
        { name: "Maria Garcia", country: "Spain", title: "My Life-Changing Heart Surgery" },
        { name: "Ben Carter", country: "Australia", title: "A Smooth Cancer Treatment Journey" },
        { name: "Nkechi Adebayo", country: "Kenya", title: "Successful IVF Treatment in India" },
      ]

      return (
        <>
          <Helmet>
            <title>Patient Stories - Hayatra Medglobe</title>
            <meta name="description" content="Read testimonials and success stories from international patients who received world-class medical treatment in India through Hayatra Medglobe." />
          </Helmet>

          <section className="bg-light-bg py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-dark-blue">
                  {t('patientStories')}
                </h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Hear from those who trusted us with their healthcare journey.
                </p>
              </motion.div>

              <div className="space-y-12">
                {stories.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex"
                  >
                    <div className="md:w-1/3">
                      <img className="w-full h-full object-cover" alt={story.image} src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                    </div>
                    <div className="p-8 md:w-2/3 relative">
                      <Quote className="absolute top-6 right-6 h-16 w-16 text-green-100" />
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{story.name}</h3>
                        <p className="text-gray-500">{story.country} | {story.treatment}</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        "{story.story}"
                      </p>
                      <div className="flex items-center">
                        {Array(story.rating).fill(0).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-dark-blue mb-4">Video Testimonials</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Watch our patients share their experiences firsthand.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videoTestimonials.map((video, index) => (
                           <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-light-bg rounded-2xl shadow-lg card-hover flex flex-col"
                           >
                                <div className="aspect-video bg-slate-200 rounded-t-2xl flex items-center justify-center">
                                    <Youtube className="h-16 w-16 text-slate-400" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-dark-blue mb-2">"{video.title}"</h3>
                                    <p className="text-md font-semibold text-slate-700">{video.name}</p>
                                    <p className="text-sm text-slate-500">{video.country}</p>
                                </div>
                           </motion.div>
                        ))}
                    </div>
                </div>
          </section>
        </>
      );
    };

    export default PatientStoriesPage;