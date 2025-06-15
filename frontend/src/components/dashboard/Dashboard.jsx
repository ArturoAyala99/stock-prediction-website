import React, { useEffect } from "react";
import axiosInstance from "../../axiosInstance";

const Dashboard = () => {

    useEffect(() => {
        const fetch_protected_data = async () => {
            try{
                // calling to the protected view
                const response = await axiosInstance.get('protected-view/');
                console.log(response.data);
            }catch (error){
                console.error(error);
                alert(error.response.status+': '+error.response.statusText+' / '+error.response.data.detail);
            }
        }
        fetch_protected_data();
    }, []);

  return (
    
    <>
        <h1 className="text-light">Hello</h1>
    </>
  )
}

export default Dashboard
