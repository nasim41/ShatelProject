import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Users = () => {
    const navigate = useNavigate();


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BACK_END_URL;
        axios.get(`${baseUrl}/users`)
            .then(function (response) {
                console.log(response)
                if (response.data.status == 'success') {
                    setUsers(response.data.data.users);
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


    const removeHandler = (id)=>{
        const baseUrl = process.env.REACT_APP_BACK_END_URL;
        setLoading(true);
        axios.delete(`${baseUrl}/users/${id}`)
            .then(function (response) {
                console.log(response)
                if (response.data.status == 'success') {
                    setLoading(false);
                    let userIdRemoved = response.data.data._id;
                    console.log(userIdRemoved)

                    let newUsers = [...users];
                    console.log(newUsers.filter(user =>user._id !== userIdRemoved ))

                    setUsers(newUsers.filter(user =>user._id !== userIdRemoved ));
                } else if (response.data.status == 'error') {
                    toast.error(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                toast.error('مشکلی پیش آمده');
            });
    }



    return (
        <div className='mt-10'>
            <ToastContainer />
            <span className='rounded-lg text-white-100 p-3 bg-green-500 cursor-pointer hover:opacity-80' onClick={() => navigate('/new')}>
                افزودن کاربر جدید
            </span>
            <span className='rounded-lg text-white-100 p-3 bg-green-500 cursor-pointer hover:opacity-80 mr-2' onClick={() => navigate('/new/file')}>
                افزودن کاربر  از فایل
            </span>
            {
                !loading ?
                    (
                        <div className='flex flex-col items-center justify-center mt-10'>
                            {
                                users.length > 0 ?
                                    (
                                        <>
                                            {
                                                users.map((user) => (
                                                    <div key={user.email} className='w-full flex items-center justify-between bg-white-100 rounded-md p-2 mb-3'>
                                                        <div className='flex-grow'>
                                                            <span>
                                                                {user.email}
                                                            </span>
                                                        </div>
                                                        <div className='flex'>
                                                            <div className='ml-2 p-2 bg-green-500 rounded-md cursor-pointer hover:opacity-100 text-white-100 text-sm' onClick={()=>navigate(`/user/${user._id}`)}>
                                                                ویرایش
                                                            </div>
                                                            <div className='p-2 bg-red-500 rounded-md cursor-pointer hover:opacity-100 text-white-100 text-sm' onClick={()=>removeHandler(user._id)}>
                                                                حذف
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))

                                            }
                                        </>
                                    )
                                    :
                                    (
                                        <span>
                                            کاربری یافت نشد
                                        </span>
                                    )
                            }

                        </div>

                    )
                    :
                    (
                        <div className='flex items-center justify-center w-full h-full'>
                            <ReactLoading className='h-full' type='bubbles' color="#22c55e" />
                        </div>
                    )
            }



        </div>


    );
}

export default Users;