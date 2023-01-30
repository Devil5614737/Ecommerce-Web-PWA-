import React from "react";
import Container from "@/components/Container";
import { Header } from "@/components/Header";

import { CartItem } from "@/components/CartItem";
import { useSelector } from "react-redux";
import { IData } from "./api/shoes";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import CheckoutForm from "@/components/CheckoutForm";

function Cart() {
  const cartState = useSelector(
    (state: {
      cartItems: {
        cartItems: IData[];
      };
    }) => state.cartItems
  );

  const dispatch = useDispatch();

  // Destructure the cartItems from the cartState
  const { cartItems } = cartState as {
    cartItems: IData[];
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  // Calculate the subtotal by multiplying the quantity of each item by its price and adding them together
  const subTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <Header />
      <main>
        <Container>
          {cartItems.length > 0 ? (
            <>
              <div className="border lg:w-[600px] w-full h-fit mx-auto p-10">
                {cartItems?.map((cartItem: IData) => (
                  <CartItem
                    key={cartItem.id}
                    cartItem={cartItem}
                    deleteItem={handleRemoveFromCart}
                  />
                ))}

                <div className="flex items-center justify-between">
                  <p className="font-semibold text-2xl">Sub Total</p>

                  <p className="font-semibold text-2xl">${subTotal}</p>
                </div>
                <CheckoutForm cartItems={cartItems} />
              </div>
            </>
          ) : (
            <h1 className="text-4xl mt-4 font-medium">Cart is empty 😪😪</h1>
          )}
          
        </Container>
      </main>
    </>
  );
}

export default Cart;
