import React, { useEffect, useState } from 'react';
import Logo from "../Assets/Images/Logo.png";
import Check from '../Assets/Images/check-green.gif'
import { Link } from 'react-router-dom';
const AlahlyMomkenSucess = () => {
    const [data, setData] = useState({});
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('data')));
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => console.error('فشل النسخ:', err));
    };

    return (
        <div className="container mt-5">
            <div className="Center Logo">
                <Link to='https://abwabelkheir.com/'>
                    <img src={Logo} width="250px" alt="logo" />
                </Link>
            </div>


            <div className="Center Logo">
                <img src={Check} width="250px" alt="logo" />
            </div>
            <h2 className="text-center mb-4">شكرا على تبرعكم! .. لقد تمت عملية الدفع بنجاح.</h2>
            <Link onClick={() => {
                localStorage.clear();
                window.location.href = 'https://abwabelkheir.com/';
            }}>
                العودة الي الصفحة الرئيسية
            </Link>

            {Object.keys(data).length > 0 &&data&&Object.keys(data).length > 0 && (
                <div className="row justify-content-center mt-3">
                    <div className="col-12 col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h4 className="card-title">تفاصيل التبرع</h4>
                                <table className="table table-bordered table-striped table-hover">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>المعلومات</th>
                                            <th>القيمة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>اسم المتبرع</td>
                                            <td>{data.customerName}</td>
                                        </tr>
                                        <tr>
                                            <td>نوع التبرع</td>
                                            <td>{data.description}</td>
                                        </tr>
                                        <tr>
                                            <td>طريقة الدفع</td>
                                            <td>الأهلي ممكن</td>
                                        </tr>
                                        <tr>
                                            <td>كود التبرع</td>
                                            <td>
                                                <button
                                                    className="btn "
                                                    onClick={() => copyToClipboard(data.transactionId)}>
                                                    {copied ? 'تم النسخ' : '📋'}
                                                </button>
                                                {data.transactionId}

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AlahlyMomkenSucess;
