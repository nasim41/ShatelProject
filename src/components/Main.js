import React,{useEffect, useState} from 'react';
import {Routes , Route } from 'react-router-dom';

import Layout from './layout/Layout';
import NotFound from './notFound/NotFound';
import Login from './login/Login';
import IsAuth from './isAuth/IsAuth';
import Users from './users/Users';
import NewUser from './newUser/NewUser';
import NewUserFile from './newUserFile/NewUserFile';
import EditUser from './editUser/EditUser';




const Main = () => {


  return(
      <Routes>
        <Route path="/"  element={
          <IsAuth>
            <Layout/>
          </IsAuth>
        }>
          <Route index element={(<Users/>)}/>
          <Route path="/new" element={(<NewUser />)}/>
          <Route path="/new/file" element={(<NewUserFile />)}/>
          <Route path="/user/:id" element={(<EditUser/>)}/>
          <Route path="*" element={<NotFound/>} />
        </Route>

        <Route path="/login" element={ 
          <IsAuth isLogin={true}>
            <Login />
          </IsAuth>}
        />
      </Routes>
  );
}

export default Main;