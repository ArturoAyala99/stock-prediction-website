import axios from "axios";

// We import the base URL to the backend, so we only pass the endpoint as a parameter.
const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

// We standardized backend calls with Axios
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {// just so that the content-type variable in the request is not undefined
        'Content-Type': 'application/json',
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    function(config){// config means the request
        const access_token = localStorage.getItem('accessToken'); // obtaining the access token that we set in Login.jsx

        if ( access_token ){// if "access_token = true" we intercept the request and inject/send the access_token on the Header
            config.headers['Authorization'] = `Bearer ${access_token}`
        }

        return config;// from here, it will go to the server
    },
    function(error){
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    function(response){
        return response;// if the response is success, we let it go to the frontend
    },
    async function(error){// hande failed response
        const originalRequest = error.config; //config means request

        // we intercept the response server to validate if whe have 401 error (unauthorized user)
        if ( error.response.status === 401 && !originalRequest.retry ){
            originalRequest.retry = true; //if we don´t put this, then it will go into an infinite loop

            // obtaining the refresh token that we set in Login.jsx
            const refresh_token = localStorage.getItem('refreshToken'); 
            try{

                //calling the refresh token endpoint
                const response = await axiosInstance.post('token/refresh/', { 
                    refresh: refresh_token //sending to the server the refresh token obtained from the localStorage
                });

                // we set the new access_token using the refresh_token after we got 401 response (unauthorized user)
                localStorage.setItem('accessToken', response.data.access);

                // we also set the new access_token to the header[Authorization]
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                return axiosInstance(originalRequest)

            }catch(error){// the refres_token has a life of 1 day, so after 1 day it will enter this block
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;