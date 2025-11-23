import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { Link } from 'react-router-dom';
import { countries } from '@/data/countries';
import { Label } from "@/components/ui/label";

const FreeEvaluationForm = ({ title, description }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    phone: '',
    problem: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value) => {
    setFormData(prev => ({ ...prev, country: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('evaluations')
      .insert([
        {
          patient_name: formData.name,
          email: formData.email,
          country: formData.country,
          phone: formData.phone,
          medical_problem: formData.problem,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
      });
    } else {
      toast({
        title: "Submission Successful!",
        description: "We've received your request and will get back to you soon.",
        className: "bg-green-500 text-white",
      });
      setFormData({ name: '', email: '', country: '', phone: '', problem: '' });
    }
  };


  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-200">
        <h2 className="text-2xl font-bold mb-2 text-center text-primary-blue">{title || t('getFreeEvaluation')}</h2>
        {description && <p className="text-center text-slate-600 mb-6 text-justify">{description}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-left">{t('patientName')}</Label>
            <Input id="name" name="name" placeholder={t('patientName')} value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
             <Label htmlFor="email" className="text-left">{t('emailAddress')}</Label>
            <Input id="email" name="email" type="email" placeholder={t('emailAddress')} value={formData.email} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country-select" className="text-left">{t('selectCountry')}</Label>
            <Select required onValueChange={handleCountryChange} value={formData.country}>
                <SelectTrigger id="country-select"><SelectValue placeholder={t('selectCountry')} /></SelectTrigger>
                <SelectContent>
                    {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                            {country.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-left">{t('phone')}</Label>
            <Input id="phone" name="phone" type="tel" placeholder={t('phone')} value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="problem" className="text-left">{t('describeMedicalProblem')}</Label>
            <Textarea id="problem" name="problem" placeholder={t('describeMedicalProblem')} value={formData.problem} onChange={handleChange} required rows={3} />
          </div>
            <Button type="submit" className="w-full btn-primary text-lg py-3 text-center" disabled={loading}>
                 {loading ? t('submitting') : t('contactUsNow')}
            </Button>
            <p className="text-xs text-slate-500 text-center text-justify">{t('bySubmittingAgreeTo')} <Link to="/terms-of-use" className="underline text-justify-none">{t('termsOfUse')}</Link> & <Link to="/privacy-policy" className="underline text-justify-none">{t('privacyPolicy')}</Link>.</p>
        </form>
    </div>
  );
};

export default FreeEvaluationForm;