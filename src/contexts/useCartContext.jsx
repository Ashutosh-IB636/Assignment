import { createContext, useState } from 'react';

const useCartContext = createContext({
 count: 0,
 setCount: () => {},
});

const CartProvider = ({ children }) => {
 const [cartProducts, setCartProducts] = useState([]);

 return (
   <useCartContext.Provider value={{ cartProducts, setCartProducts }}>
     {children}
   </useCartContext.Provider>
 );
};

export { useCartContext, CartProvider };