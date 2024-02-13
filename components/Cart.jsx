import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities,setTotalQuantities, cartItems,setCartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
  const {
    register,
    handleSubmit,
  } = useForm();

  const submitForm = async (data) => {
     await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      body: JSON.stringify({
        cartItems,
        InputData:data
      }),
    });
    setCartItems([])
    setShowCart(false)
    setTotalQuantities(0)
    toast.success(`Zakaz berildi 😊`)
  };
  return (
  <div >
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
          <div  style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn btn-danger"
              >
                Continue Shopping
              </button>
              </Link>
        </div>
        )}
         <div style={{height:"100%",justifyContent:"center",alignItems:"center",gap:"30px"}}>
          <div className='Scroll'>
          {cartItems.length >= 1 && cartItems.map((item,index) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
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
                    <span className="num" >{item.quantity}</span>
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
                  <div className="cart-bottom">
            <div >
            </div>
          </div>
                </div>
              </div>
            </div>
          ))}
          </div>
          <div>
          {cartItems.length < 1 ? (  ''
          ): 
          <div >
            <form  className='form-control d-flex justify-content-center align-items-center ' style={{flexDirection:"column"}} onSubmit={handleSubmit(submitForm)}>
            <input type="text" className='form-control mt-2 p-3 '  placeholder='FirstName' {...register('firstName',{ required: true })} />
            <input type="text" className='form-control mt-2 p-3 '  placeholder='LastName' {...register('lastName', { required: true })}  />
            <input type="text" className='form-control mt-2 p-3 '  placeholder='City' {...register('city',{ required: true })}  />
            <button type="submit" className='btn btn-danger p-2'>
                Zakaz berish 
            </button>
            </form>
          </div>
          } 

          </div>
         </div>
        </div>
      </div>
  </div>
  )
}

export default Cart