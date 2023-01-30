import { IData } from "@/pages/api/shoes";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch} from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import {motion} from 'framer-motion';

interface IProps {
  shoe: IData;
}

export const ProductCard = ({ shoe }: IProps) => {
  const { img, name, price, id } = shoe;

const {user}=useUser();

  const dispatch = useDispatch();
  const router = useRouter();




  const handleAddToCart = () => {
  if(user){
    dispatch(addToCart(shoe));
  }
  else{
    toast.error('login required')
  }
  };


  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };


  return (
    <motion.div
    variants={item} 
    
    className=" relative w-full h-fit bg-[#F4F4F4] overflow-hidden group ">
      <div
        onClick={() => router.push(`/shoe/${id}`)}
        className="relative w-full h-[250px]  "
      >
        <Image
          loading="lazy"
          src={img}
          fill
          alt="shoe"
          className="object-cover hover:scale-[1.05] cursor-pointer transition-all"
        />
      </div>
      <div className="body text-center mt-6 pb-7">
        <Link href={"#"} className="font-bold text-2xl">
          {name}
        </Link>
        <p className="text-2xl font-semibold  mt-6 text-gray-500">${price}</p>
      </div>
      <div
        onClick={handleAddToCart}
        className="absolute w-full bottom-70 text-center cursor-pointer  p-6 bg-black text-white group-hover:bottom-0 transition-all delay-1000"
      >
        <p className="font-semibold text-2xl">Add to cart</p>
      </div>
    </motion.div>
  );
};
