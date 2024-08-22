import {createContext,useEffect,useState} from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart,setCart] = useState(()=>{
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : []; 
    });
  
    useEffect(()=>{
      localStorage.setItem('cart', JSON.stringify(cart));
    },[cart])


    const addToCart = (product) =>{

      const existingProduct = cart.find(item => item.id === product.id)
      
      if(existingProduct){
        
          setCart(cart.map(item => item.id === product.id
            ?{ ...item , quantity : item.quantity+1 }
        :item
          ));
      }else{
        setCart([...cart,{...product,quantity:1}]);
      }
    };

    const removeFromCart = (product) =>{
       setCart(cart.filter(item => item.id !==  product))
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

    const clearProduct = () =>{
      setCart([])
    }
    return (
        <CartContext.Provider value ={{cart,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearProduct,setCart}}>{children}</CartContext.Provider>
    );
};