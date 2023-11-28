import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom' ;
import { Formik, Field, Form , ErrorMessage} from 'formik';
import * as Yup from "yup";
import ReactLoading from "react-loading";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from "papaparse";




const NewUserFile = () => {

    const navigate = useNavigate();

    const[loading , setLoading] = useState(false);
    const[users , setUsers] = useState([])


    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
          skipEmptyLines: true,
          complete: function (results) {
            setUsers(results.data.slice(1));
          },
        });
    };



    const submitHandler = ()=>{
        const baseUrl = process.env.REACT_APP_BACK_END_URL;
        setLoading(true);
        axios.post(`${baseUrl}/new/file`, {
            users: users,
            })
            .then(function (response) {
                console.log(response)
                if(response.data.status == 'success'){
                    navigate('/');
                }else if(response.data.status == 'error'){
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
                افزودن کاربر جدید از فایل
            </p>

            <div className='flex flex-col'>
                <label htmlFor="email" className='text-sm font-light'>انتخاب فایل</label>
                <input
                    type="file"
                    name="file"
                    accept=".csv"
                    onChange={changeHandler}
                    className='border border-gray-200 text-sm rounded-ld p-2 focus:border-green-500 outline-none'
                />
                 <button className='h-[40px] flex justify-center bg-green-500 rounded-lg text-white-100 mt-5 cursor-pointer hover:opacity-80' onClick={submitHandler}>
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
                                    افزودن
                                </span>
                               
                            )
                        }
                    </button>

            </div>
           
            
        
        </div>
        

    );
}

export default NewUserFile;