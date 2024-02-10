import React from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { UserButton, useUser } from "@clerk/nextjs";
import { useStateContext} from '../context/StateContext';
import Cart from './Cart';
const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const {user,isLoaded} = useUser()
  return (
    <div className="navbar-container">

      <div>
        <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>
      </div>
     <div style={{display:"flex",gap:"30px",alignItems:"center"}}>
     <Link href={'/Cart'}>
     <button type="button" className="cart-icon"  onClick={()=>setShowCart(true)}>
        <AiOutlineShoppingCart  />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
     </Link>
      {
              isLoaded && user ? <UserButton afterSignOutUrl='/'  /> : <Link href={'/sign-in'}><button style={{border:"none",borderRadius:"10px",boxShadow:"2px 2px 5px 5px #2222",cursor:"pointer"}} className='btn_get'>Get Started</button></Link>
      }
     </div>
      {/* {showCart && <Cart />} */}
    </div>
  )
}

export default Navbar