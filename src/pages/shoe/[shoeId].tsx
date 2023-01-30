import Container from "@/components/Container";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ShoeThumbnails } from "@/components/ShoeThumbnails";
import { ShoeInfo as ShoeInformation } from "@/components/ShoeInfo";
import { useRouter } from "next/router";
import { IData } from "../api/shoes";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

interface IProps {
  shoe: IData;
}

function ShoeInfo({ shoe }: IProps) {
  const router = useRouter();

  const cartState = useSelector(
    (state: {
      cartItems: {
        cartItems: IData[];
      };
    }) => state.cartItems
  );
  const { cartItems } = cartState;

  return (
    <>
      <header>
        <Container>
          <div className="flex items-center gap-x-5 float-right">
            <div
              onClick={() => router.push("/cart")}
              className=" border h-[40px] w-[40px] rounded-full grid place-content-center cursor-pointer relative  hover:border  group hover:bg-black"
            >
              <ShoppingBagIcon
                width={20}
                height={20}
                color="black"
                className="group-hover:text-white "
              />

              <p className="bg-blue-700  absolute top-0 text-white w-[20px] h-[20px] rounded-full grid place-content-center text-xl -left-4">
                {cartItems?.length}
              </p>
            </div>
            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => router.push("/")}
              type="button"
              className="text-white bg-black  focus:outline-none  font-medium rounded-lg text-sm p-4 text-center inline-flex items-center mr-2   float-right"
            >
              <ArrowLeftIcon width={20} height={20} color="white" />
            </motion.button>
          </div>
        </Container>
      </header>
      <main className="mt-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ShoeThumbnails thumbnails={shoe?.thumbnails} />
            <ShoeInformation data={shoe} />
          </div>
        </Container>
      </main>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
          style: {
            fontSize: 15,
          },
        }}
      />
    </>
  );
}

export default ShoeInfo;

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/shoes");
  const shoes = await res.json();
  const paths = shoes.map((shoe: IData) => {
    return {
      params: {
        shoeId: shoe.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.shoeId;
  const res = await fetch(`http://localhost:3000/api/shoe/${id}`);
  const shoe = await res.json();
  return {
    props: {
      shoe,
    },
  };
};
