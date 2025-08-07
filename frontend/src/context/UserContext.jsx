import { useContext } from 'react';

export const userContext = createContext()

 const userContextProvider = ({children}) => {
 


  const value = {

  }



  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}

export default userContextProvider;



