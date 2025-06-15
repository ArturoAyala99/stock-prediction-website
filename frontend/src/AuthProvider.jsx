import React, { useContext, useState, createContext } from "react"

// create the context
const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(
      // if there is an accessToken in localStorage, then the value will be true (otherwise it will be false)
      !!localStorage.getItem('accessToken') //its the name that we set in Login.jsx 
    )

  return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}> {/* we create the provider and we pass the values */}
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext}
