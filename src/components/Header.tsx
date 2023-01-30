import Link from "next/link";
import React from "react";
import Container from "./Container";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const Header = () => {
    const {user}=useUser();
const router=useRouter();

const cartState = useSelector((state: any) => state.cartItems);
const { cartItems } = cartState;



  return (
    <header className="sticky top-0 h-fit bg-white z-50">
      <nav className="py-3 border">
        <Container>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-7">
              <Link className="text-3xl font-semibold " href={"/"}>
                ShoeFrenzy
              </Link>
              <Link className="text-2xl font-medium " href={"/"}>
                Home
              </Link>
              {user?
              <Link className="text-2xl font-medium " href={"/api/auth/logout"}>
                Signout
              </Link>:
              <Link className="text-2xl font-medium " href={"/api/auth/login"}>
                Signin
              </Link>
              }
            </div>
        {user &&
            <div className="flex items-center gap-3">
            <div onClick={()=>router.push('/cart')} className=" border h-[40px] w-[40px] rounded-full grid place-content-center cursor-pointer relative  hover:border  group hover:bg-black">
              <ShoppingBagIcon width={20} height={20} color="black" className="group-hover:text-white " />
              {cartItems?.length>0 &&
              <p className="bg-blue-700  absolute top-0 text-white w-[20px] h-[20px] rounded-full grid place-content-center text-xl -left-4">
                {cartItems.length}
              </p>
              }
            </div>
            <Image
            width={40}
            height={40}
            src={user?.picture as string}
            alt='user dp'
            className="object-cover rounded-full"
            />
          </div>
        }
          </div>
        </Container>
      </nav>
    </header>
  );
};
