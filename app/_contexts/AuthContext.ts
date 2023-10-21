import React from "react";

export interface AuthContextType {}

const AuthContext = React.createContext<AuthContextType>({});

export default AuthContext;
