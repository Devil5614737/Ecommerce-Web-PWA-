import Container from "@/components/Container";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import { IData } from "./api/shoes";
import "react-dropdown/style.css";
import { FilterSidebar } from "@/components/FilterSidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  allProducts,
  sortByPriceHightToLow,
  sortByPriceLowToHigh,
} from "@/redux/slices/productsSlice";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

interface IProps {
  shoes: IData[];
}

function Home({ shoes }: IProps) {
  const [showFilter, setShowFilter] = useState(false);

  const options = ["Price [low-high]", "Price [high-low]"];

  const dispatch = useDispatch();

  const productsState = useSelector((state: any) => state.allProducts);

  const { products } = productsState;

  useEffect(() => {
    dispatch(allProducts(shoes as any));
  }, [dispatch, shoes]);

  const handleSort = (e: string) => {
    switch (e) {
      case "Price [low-high]":
        dispatch(sortByPriceLowToHigh());
        break;
      case "Price [high-low]":
        dispatch(sortByPriceHightToLow());
        break;
      default:
        break;
    }
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <Header />
      <main className="mt-6">
        <Container>
          <div className="flex gap-x-5 justify-end">
            <button
              onClick={() => setShowFilter(true)}
              className="border border-[#ccc] h-fit w-fit text-2xl font-semibold px-10 py-[7.6px]"
            >
              Filters
            </button>
            <ReactDropdown
              onChange={(e) => handleSort(e.value)}
              className="font-semibold text-2xl w-fit mb-5"
              options={options}
              placeholder="Sort By"
            />
          </div>
          <hr />

          <motion.div
            className="wrapper grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-7 mt-10"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {products?.map((shoe: IData) => (
              <ProductCard key={shoe.id} shoe={shoe} />
            ))}
          </motion.div>
        </Container>
      </main>
      {showFilter && <FilterSidebar setShowFilter={setShowFilter} />}
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

export default Home;

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/shoes");
  const shoes = await res.json();
  return {
    props: {
      shoes,
    },
  };
};
