import React,{Children, createContext,useState} from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart,setCart] =useState([])
  
    const addToCart = (product) =>{
      const existingProduct = cart.find(item => item.id === product.id)

      if(existingProduct){
        
          setCart(cart.map(item => item.id === product.id
            ?{...item,quantity:item.quantity+1}
        :item
          ));
      }else{
        setCart([...cart,{...product,quantity:1}]);
      }
    };

    const removeFromCart = (product) =>{
        setCart(cart.filter(item => item.id !== product.id));
      };

    const increaseQuantity = (productId) =>{
      setCart(cart.map(item => item.id === productId
        ? {...item,quantity:item.quantity+1}
        : item
      ));
    };

    const decreaseQuantity = (productId) =>{
      setCart(cart.map(item => item.id === productId && item.quantity > 1
        ? {...item,quantity:item.quantity-1}
        : item
      ));
    };

    return (
        <CartContext.Provider value ={{cart,addToCart,removeFromCart,increaseQuantity,decreaseQuantity}}>{children}</CartContext.Provider>
    );
};