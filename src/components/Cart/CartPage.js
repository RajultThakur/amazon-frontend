import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartProduct from './CartProduct'
import AppContext from '../context/appContext'
import { useState } from 'react'
import CheckOut from './CheckOut'
function CartPage () {
  const context = useContext(AppContext)
  const { cartProducts, getCartProduct, total,cartTotal,deleteProduct,getLogedUserDetails } = context;
  let userData = JSON.parse(localStorage.getItem("userInfo"));

  const POST_METHOD = (bodyField) => {
    return {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "auth-token": localStorage.getItem('amazon-token')
        },
        body: JSON.stringify(bodyField)
    }
}

  const checkout = async () => {
    try {
        const items = cartProducts.map((item) => {
            return {
                name: item.title,
                image: item.url,
                price: item.price,
                productId: item._id,
                quantity: item.count,
                userID: userData.id,
                userEmail: ""
            }
        })
        const reqParams = POST_METHOD({ items, shippingInfo: 'indore' })

        const response = await fetch(`https://amazon-server-ig6d.onrender.com/create-checkout-session`, reqParams);
        const data = await response.json();
        if (data.success === true) {
            // await removeAllFromCart();
            items.map((ele) => {
              deleteProduct(ele.url);
            })
            window.location.href = data.url
        }
    } catch (error) {
        console.log(error.message)
    }
}

  const fun = async () => {
    if (localStorage.getItem('amazon-token')) {
            await getCartProduct();
            await getLogedUserDetails();
    }
  }
  useEffect(() => {
    fun();
  }, [])
  return (
    <div className='cart__product'>
      <div>
        {cartProducts.length === 0 ? <h1>Your cart is empty! <Link to="/productpage" style={{ fontSize: "20px", textDecoration: "none" }}>Shop Now</Link> </h1> : cartProducts.map((ele) => {
          return <CartProduct key={Math.random()} price={ele.price} url={ele.url} title={ele.title} count={ele.count} />
        })}
        <div className='subtotal'>
          <h5>SubTotal({cartTotal} Items) : <span style={{ fontWeight: 'bolder' }}><span>&nbsp;&nbsp;</span><i style={{ color: 'black' }} className="fas fa-rupee-sign"></i>{cartTotal === 0?0 :total.toFixed(2)}</span></h5>
        </div>
      </div>
      <CheckOut Total = {total} item = {cartTotal} checkOut = {checkout}/>

    </div>
  )
}

export default CartPage
