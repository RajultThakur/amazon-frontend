import React,{useRef, useState} from 'react'
import AppContext from './appContext'
import Data from '../ProductData/Data'
const url ='https://amazon-server-ig6d.onrender.com/auth'
const url2 ='https://amazon-server-ig6d.onrender.com/product'
function AppState(props) {
    const [logedUser,setLogedUser] = useState({name:"",email:""})
    const [category, setCategory] = useState([]);
    const [productBycategory,setProduct] = useState([]);
    const [user,setUser] = useState({url:"",title:"",rating:"",count:"",price:"",discription:""})
    const [cartTotal,setCartTotal] = useState(0);
    const ref = useRef(null)
    const [cartProducts,setCartProducts] = useState([]);
    const [cartProduct,setCartProduct] = useState({url:'',price:0});
    const [total,setTotal] = useState(0);
    const categories = async() => {

      setCategory([
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
        ]);
            
    }
    const allProduct = () => {
      setProduct(Data);
    }

    const productByIntrest = (category) => {
      setProduct([]);
      const sortData = Data.filter((ele) => {
        return ele.category === category;
      })
      setProduct(sortData);
  }

  const searchProducts = async (value) => {
    let searchValue = value.toLowerCase();
    if (searchValue === "") {
      setProduct(Data)
    }
    let searchProducts = Data.filter(({ title }) => {
      return title.toLowerCase().includes(searchValue);
    })
    
    setProduct(searchProducts)
  }

  const getLogedUserDetails = async() => {
    console.log(localStorage.getItem("amazon-token"))
    const response = await fetch(`${url}/details`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("amazon-token")
        ,
      },
    })
    const data =await response.json();
    console.log(data.mes,"data")
    if(data.mes != undefined){
      setLogedUser({name:data.mes.name,email:data.mes.email});
      localStorage.setItem("userInfo",JSON.stringify(data.mes));
    }
    
  }

  const getCartProduct = async() => {
    const response = await fetch(`${url2}/addtocart`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("amazon-token")
        ,
      },
    })
    let data  = await response.json();
    setTotal(data.total);
    setCartTotal(data.totalProduct);
    data = data.mes;
    // console.log(data.length)
    setCartProducts(data);
  }

  const addToCart = async(url,title,price,flag) => {
    const response = await fetch(`${url2}/addtocart`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("amazon-token"),
      },
      body: JSON.stringify({url,title,price})
    })
    const data = await response.json();
    console.log(data);
    setCartProduct({url:data.mes.url,price:data.mes.price,count:data.mes.count});
    if(data.success === false)window.alert("item already in your cart")
    else{
      if(flag && data.mes!=="limitOver")
      ref.current.click();
      if(data.mes==='limitOver') window.alert("You can add max upto 5 item")
      getCartProduct();
    }
    }
  
  const deleteProduct = async(url) =>{ 
    console.log(url);
    const response = await fetch(`${url2}/addtocart`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("amazon-token"),
      },
      body:JSON.stringify({url})
    })
    let data  = await response.json();
    // console.log(data)
    setTotal(total-data.info)
    data = data.mes;
    setCartTotal(data.length);
    console.log(data.count + " " + data.price)
    localStorage.setItem("cartTotal",data.length);
    setCartProducts(data);
  }

  const removeOne = async(url) => {
    await fetch(`${url2}/removeone`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("amazon-token"),
      },
      body:JSON.stringify({url})
    })
    getCartProduct();
  }

    return (
        <AppContext.Provider value={{total,removeOne,deleteProduct,setCartProducts,cartProducts,getCartProduct,ref,cartProduct,addToCart,user,setUser, logedUser, getLogedUserDetails,categories,category,productByIntrest,productBycategory,setTotal,allProduct,cartTotal,setCartTotal,searchProducts}}>
      {props.children}
    </AppContext.Provider>
    )
}

export default AppState
