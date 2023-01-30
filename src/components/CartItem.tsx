import { IData } from '@/pages/api/shoes'
import { cartQuantity } from '@/redux/slices/cartSlice'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import ReactDropdown from 'react-dropdown'
import "react-dropdown/style.css";
import {useDispatch} from 'react-redux'



interface IProps{
  cartItem:IData,
  deleteItem:(id:number)=>void
}

export const CartItem = ({cartItem,deleteItem}:IProps) => {

  const dispatch=useDispatch();

const {name,price,img,id}=cartItem;


const options=[1,2,3,4,5];


const handleCartItemQuantity=(qty:number)=>{
  dispatch(cartQuantity({qty,cartItemId:cartItem.id}))
}



  return (
    <div className="flex gap-11 border-b pb-10 mb-10">
              <Image
                src={img}
                alt="cart "
                width={96}
                height={96}
                className="object-cover rounded-xl"
                loading="lazy"
              />

              <div className="relative right w-full flex-2">
                <div className="flex justify-between items-center">
                  <h5 className="font-semibold text-2xl">
                  {name}
                  </h5>
                  <ReactDropdown
              onChange={(e) => handleCartItemQuantity(parseInt(e.value))}
              className="font-semibold text-xl w-fit mb-5"
              options={options as []}
              placeholder="qty"
            />
                  <p className="hidden md:block font-semibold text-2xl">${price}.00</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                <p className='text-xl font-medium'>Quantity: {cartItem.quantity}</p>
                <XMarkIcon
                onClick={()=>deleteItem(id)}
                  width={25}
                  color="gray"
                  height={25}
                  className=" cursor-pointer hover:text-black"
                />
                </div>
              
              </div>
            </div>
  )
}
