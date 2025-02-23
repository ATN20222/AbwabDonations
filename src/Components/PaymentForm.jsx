import React, { useEffect, useState } from "react";
import Logo from "../Assets/Images/Logo.png";
import Alahly from '../Assets/Images/momken logo Ai green .png'
import Fawry from '../Assets/Images/hori-logo-small.webp'
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Visa from '../Assets/Images/VISA-Logo-1992.png';
import MasterCard from '../Assets/Images/MasterCard_Logo.svg.webp';
import Meza from '../Assets/Images/logo-01.svg'
function PaymentForm() {
    const [searchParams] = useSearchParams();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        amount: 10,
    });
    useEffect(() => {
        const categoryParam = searchParams.get("category");
        const subCategoryParam = searchParams.get("subcategory");

        setFormData((prev) => ({
            ...prev,
            category: categoryParam || prev.category,
            subCategory: subCategoryParam || prev.subCategory,
        }));
        console.log(formData.subCategory);
    }, [searchParams]);

    const [paymentMethod, setPaymentMethod] = useState(2);
    const [loading, setLoading] = useState(false);
    const categories = {
        "تبرع عام": [],
        "زكاة مال": ["الفقراء", "المساكين", "ابن السبيل -كفاله لاجئين", "في سبيل الله - كفالة طالب علم", "الغارمين"],
        "صدقات": ["اطعام", "باب تكافل", "باب الشفاء", "باب الايجار", "باب الحلال", "باب رزق", "باب التعليم", "باب السعاده"],
        "صدقة جارية": ["وصلا المياه", "دعم المستشفيات الحكوميه"],
        "دعم غزه": [],
        "الأنشطة الشهرية الثابتة":["مساعدات أهل غزة في مصر","الكفالات الشهرية","مشروع الإطعام الشهري (لحوم ومواد غذائية)","مساعدات الصعيد النقدية","المساعدات الطبية",],
        "حملات الخير":["تجهيز عروسة مستحقة كود 23467","مساعدات أهل السودان لشهر فبراير","كروت مشتريات رمضان لأهل غزة فى مصر","رحلة لحديقة الأهرام لـ50 طفل من أسر مستحقة","رحلة لكيدزانيا لـ50 طفل من ذوي الهمم والأيتام","المساعدات المالية رمضان 2025","كروت مشتريات شهر رمضان الكريم","توفير قطع غيار قوقعة لـ ٢٨ طفل مستحق","تغيير مفصل صناعي بالركبة اليمنى لحالة مستحقة","عملية تصحيح جراحة بالكتف لحالة مستحقة"]
    };
    const handleChange = (e) => {
        let { id, value } = e.target;
        if(id ==='phone'){
            value = e.target.value.replace(/\D/g, "").slice(0,11);
            
        }
        
        setFormData((prev) => ({
            ...prev,
            [id]: value,
            ...(id === "category" ? { category:value,subCategory: categories[value]?.[0] || "" } : {}),
        }));
    };


    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        amount: "",
    });

    const DonateWithAlahly = async () => {
        try {
            setLoading(true);
            const data = {
                "customerName": formData.firstName + " " + formData.lastName,
                "customerMobile": formData.phone,
                "amount": parseFloat(formData.amount),
                "description": formData.category + " " + formData.subCategory,
                "customerEmail": formData.email,
                "type":formData.category,
                "subt_type":formData.subCategory
            }
            const response = await axios.post("https://geeee.com/invoice_api.php?action=createInvoice",data);
            data.transactionId = response.data.transactionId;
            localStorage.setItem('data', JSON.stringify(data));
            window.location.href = `https://momknpay.alahlymomkn.com/plugin?invoiceId=${response.data.invoiceId}`
        } catch (error) {
            console.error("Error donating with Alahly: ", error);
        } finally {
            setLoading(false);
        }
    };

    const DonateWithFawry = async () => {
    
        try {
            setLoading(true);
            const data ={
                "customerName": formData.firstName +" "+ formData.lastName,
                "customerMobile": formData.phone,
                "donationAmount": formData.amount,
                "description": formData.category + " " + formData.subCategory,
                "email": formData.email,
                "type":formData.category,
                "sub_type":formData.subCategory
            }
            
            const response = await axios.post("https://geeee.com/fawry-payment-api.php",data);
            console.log(response);
            localStorage.setItem('data', JSON.stringify(data));
            window.location.href = response.data.url;
        } catch (error) {
            console.error("Error donating with Fawry: ", error);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        for (const field in formData) {
            if (!formData[field] && field !== "subCategory") {
                newErrors[field] = "هذا الحقل مطلوب";
            }
            else if (field === "phone"&&formData[field].length<11) {
                newErrors[field] = "رقم الهاتف غير صالح";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            if(paymentMethod===1){
                DonateWithFawry();
            }
            if (paymentMethod === 2) {
                DonateWithAlahly();
            }
            console.log(formData);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <form className="row" onSubmit={handleSubmit}>
                    <div className="Center Logo">
                        <Link to='https://abwabelkheir.com/'>
                            <img src={Logo} width="250px" alt="logo" />
                        </Link>
                    </div>
                    <hr />
                    <div className="text-end p-4">
                        <h5>المعلومات الشخصية</h5>
                    </div>
                    <div className="col-lg-6 text-end mb-3">
                        <label htmlFor="firstName" className="form-label">
                            الاسم الاول*
                        </label>
                        <input
                            type="text"
                            placeholder="الاسم الاول"
                            className="form-control"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <small className="text-danger ValidationSpan">{errors.firstName}</small>}
                    </div>
                    <div className="col-lg-6 text-end mb-3">
                        <label htmlFor="lastName" className="form-label">
                            الاسم الاخير*
                        </label>
                        <input
                            type="text"
                            placeholder="الاسم الاخير"
                            className="form-control"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <small className="text-danger ValidationSpan">{errors.lastName}</small>}
                    </div>
                    <div className="col-lg-12 text-end mb-3">
                        <label htmlFor="phone" className="form-label">
                            رقم الهاتف*
                        </label>
                        <input
                            type="tel"
                            placeholder=" رقم الهاتف ( مكون من 11 رقم )"
                            className="form-control"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <small className="text-danger ValidationSpan">{errors.phone}</small>}
                    </div>
                    <div className="col-lg-12 text-end mb-3">
                        <label htmlFor="email" className="form-label">
                            البريد الالكتروني*
                        </label>
                        <input
                            type="email"
                            placeholder="عنوان البريد الالكتروني"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <small className="text-danger ValidationSpan">{errors.email}</small>}
                    </div>
                    <div className="text-end p-4">
                        <h5>معلومات التبرع</h5>
                    </div>

                    <div className="col-lg-12 text-end mb-3">
                        <label htmlFor="category" className="form-label">فئة التبرع*</label>
                        <select id="category" className="form-select" value={formData.category} onChange={handleChange}>
                            <option value="">اختر فئة</option>
                            {Object.keys(categories).map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <small className="text-danger ValidationSpan">{errors.category}</small>}
                    </div>
                    {categories[formData.category] && categories[formData.category].length > 0 && (
                        <div className="col-lg-12 text-end mb-3">
                            <label htmlFor="subCategory" className="form-label">التصنيف الفرعي*</label>
                            <select id="subCategory" className="form-select" value={formData.subCategory} onChange={handleChange}>
                                {categories[formData.category].map((sub) => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                            {errors.subCategory && <small className="text-danger ValidationSpan">{errors.subCategory}</small>}
                        </div>
                    )}
                    <div className="col-lg-6 text-end mb-3">
                        <label htmlFor="amount" className="form-label">
                            المبلغ*
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            min="10"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                        {errors.amount && <small className="text-danger ValidationSpan">{errors.amount}</small>}
                    </div>

                    <div className="col-lg-12 text-end mb-3">
                        <label className="form-label">طريقة الدفع*</label>
                        <div className="d-flex">
                            <input
                                type="radio"
                                id="fawry"
                                name="paymentMethod"
                                value="فوري"
                                checked={paymentMethod === 1}
                                onChange={() => setPaymentMethod(1)}
                            />
                            <label htmlFor="fawry" className="ms-2 d-flex align-items-center">
                                <img src={Fawry} width="70px" className="p-2" alt="" />
                                فوري
                                <img className="p-1" src={Visa} width="50px" alt="" />
                                <img className="p-1" src={MasterCard} width="50px" alt="" />
                                <img className="p-1" src={Meza} width="50px" alt="" />
                            </label>
                        </div>
                        <div className="d-flex">
                            <input
                                type="radio"
                                id="ahlyMumken"
                                name="paymentMethod"
                                value="الأهلي ممكن"
                                checked={paymentMethod === 2}
                                onChange={() => setPaymentMethod(2)}
                            />
                            <label htmlFor="ahlyMumken" className="ms-2 d-flex align-items-center">

                                <img  src={Alahly} width="50px" className="p-2" alt="" />  الأهلي ممكن 
                                <img className="p-1" src={Visa} width="50px" alt="" />
                                <img className="p-1" src={MasterCard} width="50px" alt="" />
                                <img className="p-1" src={Meza} width="50px" alt="" />
                            </label>
                            
                        </div>
                            <span className="AhlyDanger">يتم اضافة عمولة بوابة الدفع الي مبلغ التبرع</span>
                    
                    </div>

                    <div className="col-lg-12 Center mt-3">
                        {loading ?
                            <div className="loader"></div>
                            :
                            <>
                            <button type="submit" className="btn SubmitBtn m-2">
                                تبرع الأن
                            </button>
                            <Link to='https://abwabelkheir.com/' type="button" className="btn CancleBtn m-2">
                                الرجوع
                            </Link>
                            </>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentForm;
