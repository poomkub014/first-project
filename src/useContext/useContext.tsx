import  React , {createContext,useEffect,useState,ReactNode} from "react";

interface Product{
  id:number;
  name:string;
  quantity:number;
}

interface CartContextType {
  cart:Product[];
  setCart:React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart : (product:Product) => void;
  removeFromCart : (product:Product) => void;
  increaseQuantity : (productId : number) => void;
  decreaseQuantity : (productId : number) => void;
  clearProduct : () => void;
  
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children:ReactNode;
}
export const CartProvider = ({children}:CartProviderProps) => {
  
    const [keyword,setKeyword] = useState<string>(''); // สร้าง useState เพื่อรับค่า keyword ที่ลูกค้าต้องการค้นหา
    const [cart,setCart] = useState<Product[]>(()=>{ // สร้าง useState เพื่อรับค่า cart ที่ลูกค้าต้องการเพิ่ม และเก็บไว้ใน localStorage
      const savedCart = localStorage.getItem('cart'); // เป็นคำสั่งในการเรียกค่า cart ใน localStorage
      return savedCart ? JSON.parse(savedCart) : []; 
    });
  
    useEffect(()=>{ //เป็นคำสั่งในการเก็บค่า cart ลงใน localStorage เมื่อ cart มีการเปลี่ยนแปลง
      localStorage.setItem('cart', JSON.stringify(cart));
    },[cart])

    

    const addToCart = (product:Product) =>{ // เป็นคำสั่งในการเพิ่มสินค้าที่ต้องการลงในตะกร้า

      const existingProduct = cart.find((item) => item.id === product.id)
      
      if(existingProduct){
        
          setCart(cart.map((item) => item.id === product.id
            ?{ ...item , quantity : item.quantity+1 }
        :item
          ));
      }else{
        setCart([...cart,{...product,quantity:1}]);
      }
    };

    const removeFromCart = (product:Product) =>{ // เป็นคำสั่งในการลบสินค้าที่ต้องการในตะกร้า
       setCart(cart.filter(item => item.id !==  product.id))
      };

    const increaseQuantity = (productId:number) =>{ // เป็นคำสั่งในการเพิ่มจำนวนสินค้าในตะกร้า
      setCart(cart.map(item => item.id === productId
        ? {...item,quantity:item.quantity+1}
        : item
      ));
    };

    const decreaseQuantity = (productId:number) =>{ // เป็นคำสั่งในการลดจำนวนสินค้าในตะกร้า
      setCart(cart.map(item => item.id === productId && item.quantity > 1
        ? {...item,quantity:item.quantity-1}
        : item
      ));
    };


    const clearProduct = () =>{ // เป็นคำสั่งในการลบสินค้าทั้งหมดในตะกร้า
      setCart([])
    }
    return (
        <CartContext.Provider value ={{cart,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearProduct,setCart,keyword,setKeyword}}>{children}</CartContext.Provider>
    );
};