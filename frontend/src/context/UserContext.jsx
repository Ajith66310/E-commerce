import React, { createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const value = {
    // add any state or functions you want to share here
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
