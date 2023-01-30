
import { useState } from 'react';
import {useDispatch} from 'react-redux'

interface ISizeSelectBtn {
  id:number,
  text: string;
  availability?: boolean;
}

export const SizeSelectBtn = ({ text, availability ,id}: ISizeSelectBtn):JSX.Element => {

const[selectedSize,setSelectedSize]=useState<number>();
  const dispatch=useDispatch()

  return (
    <div
  onClick={()=>setSelectedSize(id)}
  // style={{
  //   borderColor:selectedSize==id&&"black"
  // }}
      className={`size border hover:border-black w-fit px-8 py-4 cursor-pointer rounded-lg bg-${
        !availability && "gray-300"
      }  ${availability ? "cursor-pointer" : "cursor-not-allowed"}`}
    >
      <p className="text-3xl">{text}</p>
    </div>
  );
};
