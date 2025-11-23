import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Wallet, ChevronsUpDown, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useTable, useSortBy } from 'react-table';
import Breadcrumb from '@/components/Breadcrumb';

const TreatmentSubPage = () => {
    const { slug } = useParams();
    const { t, language } = useLanguage();

    const [treatmentData, setTreatmentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const apiURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${apiURL}/public/treatments/${slug}`);
                if (!res.ok) throw new Error("Not found");
                const data = await res.json();
                setTreatmentData(data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    // ---------------------------------------------------
    // Localized Title
    // ---------------------------------------------------
    const categoryTitle = useMemo(() => {
        if (!treatmentData) return "";
        return language === "ar"
            ? treatmentData.treatmentNameAr || treatmentData.treatmentName
            : treatmentData.treatmentName;
    }, [treatmentData, language]);

    const categoryDescription = useMemo(() => {
        if (!treatmentData) return "";
        return language === "ar"
            ? treatmentData.descriptionAr || treatmentData.description
            : treatmentData.description;
    }, [treatmentData, language]);

    // ---------------------------------------------------
    // FIXED COST TABLE MAPPING
    // ---------------------------------------------------
    const filteredTreatments = useMemo(() => {
        if (!treatmentData?.costTable) return [];

        return treatmentData.costTable.map((item) => ({
            treatmentName: item.name || "—",
            description: item.description || "—",
            costRange:
                item.costFrom && item.costTo
                    ? `${item.costFrom} - ${item.costTo} ${item.currency || "USD"}`
                    : item.costFrom
                        ? `${item.costFrom} ${item.currency || "USD"}`
                        : "—",
        }));
    }, [treatmentData]);

    // ---------------------------------------------------
    // Table Columns
    // ---------------------------------------------------
    const columns = useMemo(
        () => [
            { Header: t("treatment"), accessor: "treatmentName" },
            { Header: t("description"), accessor: "description" },
            { Header: t("cost"), accessor: "costRange" },
            {
                Header: "",
                id: "action",
                Cell: () => (
                    <Link to="/get-quote">
                        <Button variant="outline" size="sm">{t("getQuote")}</Button>
                    </Link>
                ),
            },
        ],
        [t]
    );

    const tableInstance = useTable(
        { columns, data: filteredTreatments },
        useSortBy
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        );
    }

    if (error || !treatmentData) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Treatment not found</h1>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`${categoryTitle || ""} - Treatments in India`}</title>
                <meta
                    name="description"
                    content={`Find costs and details for ${categoryTitle || ""} treatments in India.`}
                />
            </Helmet>

            <section className="bg-light-bg section-padding">
                <div className="container mx-auto px-4">

                    {/* Breadcrumb */}
                    <div className="mb-12">
                        <Breadcrumb
                            items={[
                                { label: t("treatments"), link: "/treatments" },
                                { label: categoryTitle },
                            ]}
                        />
                    </div>

                    {/* HEADER */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="mb-4 text-dark-blue">{categoryTitle}</h1>
                                <p className="text-xl text-slate-600 max-w-3xl">
                                    {categoryDescription}
                                </p>
                            </div>

                            <div className="mt-6 md:mt-0">
                                <Link to="/contact">
                                    <Button className="btn-primary text-lg">
                                        <Phone className="mr-2 h-5 w-5" /> {t("getFreeQuote")}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* COST TABLE */}
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-12">
                            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-100">
                                <h2 className="text-2xl font-bold mb-6">Treatment Costs</h2>

                                <div className="overflow-x-auto">
                                    <table {...getTableProps()} className="w-full">
                                        <thead>
                                            {headerGroups.map((headerGroup) => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map((column) => (
                                                        <th
                                                            {...column.getHeaderProps(
                                                                column.getSortByToggleProps()
                                                            )}
                                                            className="p-4 text-left text-sm font-semibold text-slate-500 uppercase tracking-wider border-b-2 border-slate-100"
                                                        >
                                                            <span className="flex items-center">
                                                                {column.render("Header")}
                                                                {column.isSorted ? (
                                                                    column.isSortedDesc ? " 🔽" : " 🔼"
                                                                ) : column.id !== "action" ? (
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 text-slate-400" />
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </span>
                                                        </th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>

                                        <tbody {...getTableBodyProps()}>
                                            {rows.map((row) => {
                                                prepareRow(row);
                                                return (
                                                    <tr
                                                        {...row.getRowProps()}
                                                        className="border-b border-slate-100 hover:bg-slate-50"
                                                    >
                                                        {row.cells.map((cell) => (
                                                            <td
                                                                {...cell.getCellProps()}
                                                                className="p-4 align-middle text-slate-600"
                                                            >
                                                                {cell.column.id === "costRange" ? (
                                                                    <span className="font-semibold text-primary-blue bg-primary-blue/10 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                                                                        {cell.render("Cell")}
                                                                    </span>
                                                                ) : cell.column.id === "treatmentName" ? (
                                                                    <span className="font-semibold text-dark-blue">
                                                                        {cell.render("Cell")}
                                                                    </span>
                                                                ) : (
                                                                    cell.render("Cell")
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CUSTOM QUOTE BANNER */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-primary-blue/10 border-l-4 border-primary-blue p-8 rounded-xl text-center"
                    >
                        <Wallet className="h-12 w-12 mx-auto text-primary-blue mb-4" />
                        <h2 className="text-2xl font-bold text-dark-blue mb-2">Need a Custom Quote?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mb-6">
                            The prices listed are indicative. For a personalized quote based on
                            your medical reports, contact us for a free evaluation.
                        </p>
                        <Link to="/get-quote">
                            <Button className="btn-secondary text-lg">
                                Get a Free Personalized Quote
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default TreatmentSubPage;
