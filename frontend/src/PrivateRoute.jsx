import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({children}) => {

    const { isLoggedIn } = useContext(AuthContext)

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to='/login' />
    )
  
    // if you are not logged in, you will be redirected to the login Component
    // so f you want to go to the dashboard page usign the url and you are not logged in, you will be redirected to the login
}

export default PrivateRoute
