import { createContext, useState } from 'react';

const useUserContext = createContext({
 count: 0,
 setCount: () => {},
});

const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);

 return (
   <useUserContext.Provider value={{ user, setUser }}>
     {children}
   </useUserContext.Provider>
 );
};

export { useUserContext, UserProvider };