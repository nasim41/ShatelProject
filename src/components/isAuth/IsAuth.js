import { useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


const IsAuth = ({  isLogin=false , children }) => {

    const cookies = new Cookies();
    let user = cookies.get('auth')
    

    console.log('user IsAuth' , user);

    if(!user && !isLogin){
        return <Navigate to="/login" replace />;
    }

    if(user && isLogin){
        return <Navigate to="/" replace />;
    }


    return children;
};

export default IsAuth ;