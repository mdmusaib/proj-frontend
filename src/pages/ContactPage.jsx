import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, MapPin, Clock, MessageSquare, Upload, Users, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/data/countries';
import { supabase } from '@/lib/customSupabaseClient';
import { Link } from 'react-router-dom';
import XIcon from '@/components/XIcon';

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    treatment: '',
    language: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    toast({
      title: "🚧 Feature in Progress",
      description: "File upload isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://proj-1r29.onrender.com/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          country: formData.country,
          phone: formData.phone,
          treatment: formData.treatment,
          message: formData.message,
          language: formData.language,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: data.error || "Could not submit the form.",
        });
        return;
      }

      toast({
        title: "Message Sent Successfully! 📩",
        description: "Our team will get back to you within 24 hours.",
        className: "bg-green-500 text-white",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        message: '',
        treatment: '',
        language: '',
      });

    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Unable to send message. Please try again.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Hayatra Medglobe | Get a Free Medical Opinion</title>
        <meta name="description" content="Reach out to Hayatra Medglobe for expert medical opinions, treatment cost estimates, and visa assistance. Our team provides 24/7 support for international patients in English & Arabic." />
        <meta name="keywords" content="contact medical tourism India, free medical quote India, hospital support, Hayatra Medglobe contact" />
      </Helmet>

      <section className="relative bg-light-bg py-20 md:py-28">
        <div className="absolute inset-0">
          <img alt="A compassionate handshake between a doctor and a patient, symbolizing trust and care." className="w-full h-full object-cover opacity-10" src="https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c" />
          <div className="absolute inset-0 bg-gradient-to-b from-light-bg via-light-bg/80 to-light-bg"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-dark-blue mb-6 leading-tight">
              We’re Here to Help, Anytime, Anywhere
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-4xl mx-auto mb-10 text-justify">
              Whether you need a medical opinion, cost estimate, or visa assistance, the Hayatra Medglobe team is always ready to support you. Our multilingual team ensures that every patient, from any part of the world, feels heard and cared for.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-quote">
                <Button className="btn-primary rounded-full text-lg px-8 py-4 w-full sm:w-auto">
                  <Users className="h-5 w-5 me-2"/> Get a Free Medical Opinion
                </Button>
              </Link>
              <a href="https://wa.me/917092455157" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white rounded-full text-lg px-8 py-4 w-full sm:w-auto">
                  <MessageSquare className="h-5 w-5 me-2"/> Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-light-bg rounded-2xl shadow-xl p-8 border border-slate-100">
                <h2 className="text-3xl font-bold mb-2 text-primary-blue">Send Us Your Medical Enquiry</h2>
                <p className="text-slate-600 mb-8 text-left">Fill out this form, and our medical coordinator will reach out within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><Label htmlFor="name">{t('name')}</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-2" /></div>
                    <div><Label htmlFor="email">{t('email')}</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="mt-2" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">{t('selectCountry')}</Label>
                      <Select required onValueChange={(value) => handleSelectChange('country', value)} value={formData.country}>
                        <SelectTrigger className="mt-2"><SelectValue placeholder={t('selectCountry')} /></SelectTrigger>
                        <SelectContent>{countries.map((c) => <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div><Label htmlFor="phone">{t('phone')}</Label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="mt-2" /></div>
                  </div>
                  <div><Label htmlFor="treatment">Treatment / Medical Concern</Label><Input id="treatment" name="treatment" value={formData.treatment} onChange={handleChange} required className="mt-2" /></div>
                  <div><Label htmlFor="message">{t('message')}</Label><Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="mt-2" /></div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="language">Preferred Language</Label>
                      <Select onValueChange={(value) => handleSelectChange('language', value)} value={formData.language}>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Select Language" /></SelectTrigger>
                        <SelectContent><SelectItem value="English">English</SelectItem><SelectItem value="Arabic">Arabic</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="reports">Upload Medical Reports (optional)</Label>
                      <div className="mt-2 flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-slate-50">
                          <div className="flex items-center justify-center pt-5 pb-6">
                            <Upload className="w-6 h-6 text-gray-500" />
                            <p className="ml-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full btn-primary text-lg py-6" disabled={loading}>
                    {loading ? t('submitting') : t('contactUsNow')} <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-light-bg rounded-2xl shadow-xl p-8 border border-slate-100">
                <h3 className="text-2xl font-bold mb-6 text-primary-blue">Prefer WhatsApp? Let’s Chat Instantly</h3>
                <div className="space-y-4">
                  <a href="https://wa.me/917092455157?text=Hello%20Hayatra%20Medglobe%2C%20I%20need%20medical%20assistance." target="_blank" rel="noopener noreferrer">
                    <Button className="w-full btn-primary text-lg py-6">
                      <MessageSquare className="mr-2 h-5 w-5" /> Chat in English
                    </Button>
                  </a>
                  <a href="https://wa.me/919716511527?text=مرحبا%20حياة%20ميدجلوبي%2C%20أحتاج%20مساعدة%20طبية." target="_blank" rel="noopener noreferrer">
                    <Button className="w-full btn-secondary text-lg py-6">
                      <MessageSquare className="mr-2 h-5 w-5" /> Chat in Arabic
                    </Button>
                  </a>
                </div>
              </div>

              <div className="bg-light-bg rounded-2xl shadow-xl p-8 border border-slate-100">
                <h3 className="text-2xl font-bold mb-6 text-primary-blue">Direct Contact Details</h3>
                <div className="space-y-5">
                  <div className="flex items-start space-x-4"><div className="bg-primary-green/10 p-3 rounded-full text-primary-green mt-1"><Phone className="h-5 w-5" /></div><div><p className="font-semibold text-dark-blue">{t('forEnglish')}</p><a href="tel:+917092455157" className="text-slate-600 hover:text-primary-green">+91 70924 55157</a></div></div>
                  <div className="flex items-start space-x-4"><div className="bg-primary-green/10 p-3 rounded-full text-primary-green mt-1"><Phone className="h-5 w-5" /></div><div><p className="font-semibold text-dark-blue">{t('forArabic')}</p><a href="tel:+919716511527" className="text-slate-600 hover:text-primary-green">+91 97165 11527</a></div></div>
                  <div className="flex items-start space-x-4"><div className="bg-primary-green/10 p-3 rounded-full text-primary-green mt-1"><Mail className="h-5 w-5" /></div><div><p className="font-semibold text-dark-blue">Email</p><a href="mailto:hayatramedglobe@gmail.com" className="text-slate-600 hover:text-primary-green break-all">hayatramedglobe@gmail.com</a></div></div>
                  <div className="flex items-start space-x-4"><div className="bg-primary-green/10 p-3 rounded-full text-primary-green mt-1"><MapPin className="h-5 w-5" /></div><div><p className="font-semibold text-dark-blue">Address</p><p className="text-slate-600 text-left">India – 122001</p></div></div>
                  <div className="flex items-start space-x-4"><div className="bg-primary-green/10 p-3 rounded-full text-primary-green mt-1"><Clock className="h-5 w-5" /></div><div><p className="font-semibold text-dark-blue">Response Time</p><p className="text-slate-600 text-left">Within 24 Hours (Mon–Sat)</p></div></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-blue">Our Office Location</h2>
            <p className="text-lg text-slate-600 mt-2 text-justify">Based in India, serving patients worldwide.</p>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.839231951!2d77.06889754754533!3d28.527280338002454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1678886456789!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hayatra Medglobe Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark-blue mb-4">Follow & Stay Connected</h2>
          <p className="text-lg text-slate-600 mb-8 text-justify">Stay updated with health insights and patient stories.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-slate-500 hover:text-primary-blue"><XIcon className="h-8 w-8" /></a>
            <a href="#" className="text-slate-500 hover:text-primary-blue"><Facebook size={32} /></a>
            <a href="#" className="text-slate-500 hover:text-primary-blue"><Instagram size={32} /></a>
            <a href="#" className="text-slate-500 hover:text-primary-blue"><Youtube size={32} /></a>
          </div>
        </div>
      </section>

      <section className="bg-primary-blue text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Your Health Journey Begins Here</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto text-justify">Let us connect you to India’s best hospitals and doctors today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/get-quote">
              <Button className="bg-white text-primary-blue hover:bg-slate-100 rounded-full text-lg px-8 py-4 w-full sm:w-auto">
                Send Enquiry
              </Button>
            </Link>
            <a href="https://wa.me/917092455157" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-blue rounded-full text-lg px-8 py-4 w-full sm:w-auto">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;