import { IData } from "@/pages/api/shoes";
import { addToCart } from "@/redux/slices/cartSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import { motion } from "framer-motion";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Accordian } from "./Accordian";
import { SizeSelectBtn } from "./SizeSelectBtn";

interface IProps {
  data: IData;
}

export const ShoeInfo = ({ data }: IProps) => {
  const { name, price, sizes, overview } = data;
  const { user } = useUser();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(data));
      toast.success("added to cart");
    } else {
      toast.error("login required");
    }
  };

  return (
    <div>
      <h1 className="font-bold text-5xl">{name}</h1>
      <p className="mt-5 text-2xl font-medium">MRP: ${price}</p>

      <div className="sizes mt-5 flex gap-3 flex-wrap mb-6">
        {sizes?.map(({ id, is_available, size }) => (
          <SizeSelectBtn
            key={id}
            text={size}
            availability={is_available}
            id={id}
          />
        ))}
      </div>

      <motion.button
        onClick={handleAddToCart}
        whileTap={{
          scale: 0.9,
        }}
        className="bg-black text-white w-full py-6 text-2xl cursor-pointer rounded-lg"
      >
        Add to cart
      </motion.button>
      <div className="my-6">
        <p className="font-semibold text-3xl mb-3">Overview</p>
        <p className="text-semibold text-2xl leading-10">{overview}</p>
      </div>
      <div className="accordian mt-9">
        <Accordian title="Product Details">
          Inspired by generations of Js, these kicks are a collage of cool.
          Design details recall decades of legendary shoes while paying homage
          to MJs storied career. Breathable mesh, sturdy leather and lightweight
          Air cushioning in the heel make it that much easier to walk in the
          footsteps of greatness.
          <p className="mt-3 text-semibold text-2xl">Benefits</p>
          <ul className="benefits">
            <li>
              Nike Air technology absorbs impact for cushioning with every step.
            </li>
            <li>Knit mesh toe lets your feet breath.</li>
          </ul>
          <p className="mt-3 text-semibold text-2xl">Product Details</p>
          <ul>
            <li>Jumpman logo heel band</li>
            <li>Moulded eyelet detail</li>
            <li>Colour Shown: Black/Gym Red/White</li>
            <li>Country/Region of Origin: Vietnam</li>
          </ul>
        </Accordian>
        <Accordian title="Product Information">
          Declaration of Importer: Direct import by the individual customer
          Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir
          Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
          Net Quantity: 1 Pair
        </Accordian>
      </div>
    </div>
  );
};
