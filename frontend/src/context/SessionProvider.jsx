import React, { createContext, useContext, useEffect, useState } from 'react'

const backendUrl = import.meta.env.VITE_API_URL + '/auth'

const AuthContext = createContext();


const SessionProvider = ({ children }) => {

  const [user, setUser] = useState(false);

  const getSession = async () => {
    try {
      const res = await fetch(`${backendUrl}/session`, { method: 'GET', credentials: 'include' });
      const data = await res.json();

      if (data.success) {
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  }

  useEffect(() => {
    getSession();
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { SessionProvider, useAuth }