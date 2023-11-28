import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import ReactLoading from "react-loading";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NewUser = () => {

    const navigate = useNavigate();
    const { id } = useParams();


    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('333')


    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BACK_END_URL;
        axios.get(`${baseUrl}/users/${id}`)
            .then(function (response) {
                if (response.data.status == 'success') {
                    console.log(response.data.data.user.email)
                    //setEmail(response.data.data.email);
                    setEmail(response.data.data.user.email)
                    setLoading(false);
                } else if (response.data.status == 'error') {
                    toast.error(response.data.msg);
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);

            });

    }, [])




    const loginSchema = Yup.object().shape({
        email: Yup.string().email('لطفا ایمیل معتبر وارد کنید').required('لطفا این قسمت را پر کنید'),
    });

    const submitHandler = (values) => {
        const baseUrl = 'http://localhost:5000';
        setLoading(true);
        axios.put(`${baseUrl}/user/${id}`, {
            email: values.email,
        })
            .then(function (response) {
                console.log(response)
                if (response.data.status == 'success') {
                    navigate('/');
                } else if (response.data.status == 'error') {
                    toast.error(response.data.msg);
                    setLoading(false);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                toast.error('مشکلی پیش آمده');
            });
    }


    return (
        <div className='bg-white-100 m-auto w-full max-w-[500px] font-vazir p-5 rounded-lg mt-20'>
            <ToastContainer />
            <p className='w-full text-center font-bold mx-auto mb-[20px]'>
                ویرایش کاربر
            </p>
            {
                loading ?
                    (
                        <div className='flex items-center justify-center w-full h-full'>
                            <ReactLoading className='h-full' type='bubbles' color="#22c55e" />
                        </div>
                    )
                    :
                    (
                        <Formik
                            initialValues={{ email: email }}
                            validationSchema={loginSchema}
                            onSubmit={submitHandler}
                        >
                            <Form className='flex flex-col'>
                                <label htmlFor="email" className='text-sm font-light'>ایمیل</label>
                                <Field
                                    className='border border-gray-200 text-sm rounded-ld p-2 focus:border-green-500 outline-none'
                                    id="email"
                                    name="email"
                                    type="email"
                                />
                                <ErrorMessage name='email' render={(msg) => <span className='text-red-500 text-sm'>{msg}</span>} />
                                <button type="submit" className='h-[40px] flex justify-center bg-green-500 rounded-lg text-white-100 mt-10 cursor-pointer hover:opacity-80'>
                                    {
                                        loading ?
                                            (
                                                <div className='flex items-center justify-center w-full h-full'>
                                                    <ReactLoading className='h-full' type='bubbles' color="#fff" />
                                                </div>
                                            )
                                            :
                                            (

                                                <span className='leading-8 text-center leading-[2.5rem]'>
                                                    ویرایش
                                                </span>

                                            )
                                    }
                                </button>
                            </Form>

                        </Formik>

                    )
            }

        </div>


    );
}

export default NewUser;