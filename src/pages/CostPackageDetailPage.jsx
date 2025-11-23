import React from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';
    import { ArrowLeft, CheckCircle, XCircle, Info } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { toast } from '@/components/ui/use-toast';

    const CostPackageDetailPage = () => {
        const { slug } = useParams();

        // This is placeholder data. In a real app, you'd fetch this based on the slug.
        const packageDetails = {
            "comprehensive-heart-checkup": {
                name: "Comprehensive Heart Check-up",
                price: "$300",
                hospital: "Apollo Hospitals, Delhi",
                hospitalSlug: "apollo-hospitals",
                description: "An extensive package designed for a thorough evaluation of your cardiovascular health, recommended for individuals over 35 or with risk factors.",
                inclusions: ["Consultation with Senior Cardiologist", "ECG", "Echocardiogram", "Treadmill Test (TMT)", "Complete Lipid Profile", "Blood Sugar (Fasting & PP)", "Kidney Function Test"],
                exclusions: ["Any additional tests or consultations", "Medications", "In-patient stay"],
            },
            "knee-replacement-package": {
                name: "Knee Replacement Package",
                price: "$5,500",
                hospital: "Fortis Healthcare, Mumbai",
                hospitalSlug: "fortis-healthcare",
                description: "A complete package for unilateral total knee replacement surgery, using high-quality implants and performed by expert orthopedic surgeons.",
                inclusions: ["Surgeon & Anesthetist Fees", "Standard Implant Cost", "5-day Hospital Stay in a Private Room", "Routine Medications & Consumables", "Pre-operative Tests", "Post-operative Physiotherapy (5 sessions)"],
                exclusions: ["Stay beyond 5 days", "High-end or custom implants", "Treatment of any other illness"],
            }
        };

        const pkg = packageDetails[slug];

        React.useEffect(() => {
            toast({
                title: "Login Required 🔒",
                description: "This is a preview. Full access is for registered users.",
            });
        }, []);

        if (!pkg) {
            return <div className="container mx-auto px-4 py-20 text-center">Package not found.</div>;
        }

        return (
            <>
                <Helmet>
                    <title>{pkg.name} - Cost & Package Details</title>
                    <meta name="description" content={`Detailed cost breakdown for the ${pkg.name} package at ${pkg.hospital}.`} />
                </Helmet>

                <section className="bg-light-bg py-20">
                    <div className="container mx-auto px-4">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <Link to="/cost-packages">
                                <Button variant="outline" className="mb-8">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Packages
                                </Button>
                            </Link>
                        </motion.div>

                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-6 mb-6">
                                    <div>
                                        <h1 className="text-4xl font-bold text-dark-blue mb-2">{pkg.name}</h1>
                                        <Link to={`/hospitals/${pkg.hospitalSlug}`} className="text-lg text-slate-600 hover:text-primary-blue">{pkg.hospital}</Link>
                                    </div>
                                    <div className="text-left md:text-right mt-4 md:mt-0">
                                        <p className="text-4xl font-extrabold text-primary-green">{pkg.price}</p>
                                        <span className="text-slate-500">approximate cost</span>
                                    </div>
                                </div>
                                <p className="text-slate-600 leading-relaxed mb-8">{pkg.description}</p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                    <h2 className="text-2xl font-bold text-dark-blue mb-4">What's Included?</h2>
                                    <ul className="space-y-3">
                                        {pkg.inclusions.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                    <h2 className="text-2xl font-bold text-dark-blue mb-4">What's Not Included?</h2>
                                    <ul className="space-y-3">
                                        {pkg.exclusions.map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <XCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-slate-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                <div className="mt-10 bg-primary-blue/10 p-6 rounded-lg flex items-start">
                                    <Info className="h-6 w-6 text-primary-blue mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-dark-blue mb-1">Please Note</h3>
                                        <p className="text-sm text-slate-600">This is a sample package. The final cost may vary based on the patient's medical condition, choice of room, and duration of stay. A personalized quote will be provided after medical evaluation.</p>
                                    </div>
                                </div>
                                <div className="text-center mt-8">
                                    <Link to="/contact">
                                        <Button className="btn-primary text-lg">Request This Package</Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </>
        );
    };

    export default CostPackageDetailPage;