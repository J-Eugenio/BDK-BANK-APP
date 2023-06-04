import React from 'react';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }: any) => {
    return (
      //@ts-ignore
      <AuthProvider>
          {children}
      </AuthProvider>
    )
}

export default AppProvider;