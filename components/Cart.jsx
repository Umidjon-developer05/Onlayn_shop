import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import Image from 'next/image';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities,setTotalQuantities, cartItems,setCartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();


  
  const submitForm = async () => {
     await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      body: JSON.stringify({
        cartItems
      }),
    });
    setCartItems([])
    setShowCart(false)
    setTotalQuantities(0)
    toast.success(`Zakaz berildi 😊`)
  };
  return (
    <div  ref={cartRef}>
      <div>
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img alt='asa' width={1000} height={1000} src={urlFor(item?.img[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div >
              <button type="button" className="btn" onClick={()=>submitForm() }>
                 Zakaz berish 
              </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default Cart