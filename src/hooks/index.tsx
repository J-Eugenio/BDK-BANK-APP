import React from 'react';
import { AuthProvider } from './auth';


function AppProvider({ children }: any){
    return (
      //@ts-ignore
      <AuthProvider>
          {children}
      </AuthProvider>
    )
}

export default AppProvider;