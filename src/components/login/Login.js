import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom' ;
import { Formik, Field, Form , ErrorMessage} from 'formik';
import * as Yup from "yup";
import ReactLoading from "react-loading";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';




const Login = () => {

    const navigate = useNavigate();

    const[loading , setLoading] = useState(false);

    const loginSchema = Yup.object().shape({
        password: Yup.string().required('لطفا این قسمت را پر کنید'),
        email: Yup.string().email('لطفا ایمیل معتبر وارد کنید').required('لطفا این قسمت را پر کنید'),
    });

    const submitHandler = (values)=>{
        console.log(values)
        const baseUrl = process.env.REACT_APP_BACK_END_URL;
        setLoading(true);
        axios.post(`${baseUrl}/login`, {
            email: values.email,
            password: values.password
            })
            .then(function (response) {
                if(response.data.status == 'success'){
                    let admin = response.data.data;
                    const cookies = new Cookies();
                    cookies.set('auth', admin.email , { path: '/' });
                    setTimeout(()=>{
                        navigate('/' , { replace: true });
                    } , 1000)
                }else if(response.data.status == 'error'){
                    toast.error(response.data.msg);
                    setLoading(false);
                }

                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });

    }
      

    return (
        <div className='bg-white-100 m-auto w-full max-w-[500px] font-vazir p-5 rounded-lg'>
            <ToastContainer />
            <p className='w-full text-center font-bold mx-auto mb-[20px]'>
                ورود به داشبرد
            </p>
            <Formik
            initialValues={{ email: '', password: '' }}
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
                    <ErrorMessage name='email' render={(msg)=><span className='text-red-500 text-sm'>{msg}</span>}/>
                     <label htmlFor="password" className='text-sm font-light mt-5'>رمز عبور</label>
                    <Field id="password" name="password"
                    className='border border-gray-200 text-sm rounded-ld p-2 focus:border-green-500 outline-none'
                    />
                    <ErrorMessage name='password' render={(msg)=><span className='text-red-500 text-sm'>{msg}</span>}/>
                    <button type="submit" className='h-[40px] flex justify-center bg-green-500 rounded-lg text-white-100 mt-10 cursor-pointer hover:opacity-80'>
                        {
                            loading ? 
                            (
                                <div className='flex items-center justify-center w-full h-full'>
                                <ReactLoading className='h-full' type='bubbles' color="#fff"/>
                                </div>
                            )
                            :
                            (
                                
                                <span className='leading-8 text-center leading-[2.5rem]'>
                                    ورود
                                </span>
                               
                            )
                        }
                    </button>
                </Form>
          
            </Formik>
        </div>
        

    );
}

export default Login;