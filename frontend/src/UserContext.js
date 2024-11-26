import React, { createContext, useState } from 'react';

// Create a context for the user
export const UserContext = createContext();

// Provide the context to the components
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
