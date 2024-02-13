import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Admin from './Admin';
const AdminDashboard = () => {
    const  [data,setData] =useState()
    const GetAllProduct = async ()=> {
        await axios("http://localhost:3000/api/cart",{method:"GET"}).then((res)=>setData(res?.data?.data));
    }
    useEffect(()=>{
        GetAllProduct()
    },[])
  return (
    <div >
                        <table className="table table-bordered  container mt-5 " >
                        <thead >
                            <tr>
                            <th >№</th>
                            <th >FisrtName</th>
                            <th >LastName</th>
                            <th >City</th>
                            <th >Mahsulot</th>
                            <th >Action</th>
                            </tr>
                        </thead>
                        {
                            data?.map((item,index)=>(
                                        <tbody key={index}>     
                                            <tr>
                                            <th >{index + 1}</th>
                                            <td>{item?.InputData?.firstName}</td>
                                            <td> {item?.InputData?.lastName}</td>
                                            <td> {item?.InputData?.city}</td>
                                            <td className='d-flex align-items-center gap-2 '>
                                            <Admin cartItems={item.cartItems}/>
                                            </td>
                                            <td>
                                                <button className='btn btn-info text-white '>Mahsulotni qabul qilish</button>
                                            </td>
                                            </tr>
                                        </tbody>
                            ))
                        }
        </table>
    </div>
  )
}

export default AdminDashboard