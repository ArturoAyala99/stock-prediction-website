import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PublicRoute = ({children}) => {

    const { isLoggedIn } = useContext(AuthContext)

    return !isLoggedIn ? (
        children
    ) : (
        <Navigate to='/dashboard' />
    )
  
    // if you are logged in, you will be redirected to the Dashboard Component
    // so if you want to go to the login page usign the url and you are already login, you will be redirected to the dashboard
}

export default PublicRoute
