import React from 'react'
import { urlFor } from '../../../lib/client';

const Admin = ({cartItems}) => {
  console.log(cartItems);
  return (
    <div >
      {
        cartItems.map((item,index)=>(
          <div key={index} className='d-flex p-2 gap-3 ' >
              <div>
              <img alt='sas'  src={urlFor(item?.image && item?.image[index])} className="product-detail-image1" />
              </div>
             <div>
             <div>

            <span className='text-body-tertiary'>Mahsulot nomi : </span>
              <span>{item?.name}</span>

              </div>
            <div>

            <span className='text-body-tertiary'>Mahsulot narxi : </span>
            <span>{item?.price}</span>
            </div>
            <div>
            <span className='text-body-tertiary'>Mahsulot  soni : </span>
            <span>{item?.quantity}</span>
            </div>
            <div>
            <span className='text-body-tertiary'>Mahsulot Umumiy narxi : </span>
            <span>{parseInt(item?.quantity) * parseInt(item?.price)}</span>
            </div>
             </div>
          </div>
        ))
}
    </div>
  )
}

export default Admin