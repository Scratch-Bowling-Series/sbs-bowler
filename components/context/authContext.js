import React from 'react'
const AuthContext = React.createContext('auth')
export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer
export default AuthContext