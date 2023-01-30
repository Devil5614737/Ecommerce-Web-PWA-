import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Accordian } from "./Accordian";
import { useDispatch } from "react-redux";
import {
  filterByColor,
  filterByPriceRange,
} from "@/redux/slices/productsSlice";

interface IProps {
  setShowFilter: (showFilter: boolean) => void;
}

export const FilterSidebar = ({ setShowFilter }: IProps) => {
  const dispatch = useDispatch();

  const [rangeValue, setRangeValue] = useState<number>(200);

  const handleFilterByColor = (color: string) => {
    dispatch(filterByColor(color));
  };

  useEffect(() => {
    dispatch(filterByPriceRange({ min: rangeValue, max: 1000 }));
  }, [rangeValue]);

  return (
    <div className="w-[100vw] h-[100vh] bg-[rgba(0,0,0,.6)]  fixed top-0 left-0 z-50">
      <div className="w-[300px] h-[100vh] bg-white relative p-5">
        <XMarkIcon
          onClick={() => setShowFilter(false)}
          className="absolute top-5 right-5 cursor-pointer"
          width={30}
          height={30}
          color="black"
        />
        <div className="mt-20">
          <Accordian title="Colors">
            <div className="flex flex-wrap  gap-x-3">
              {["red", "blue", "black"].map((color) => (
                <div
                  key={color}
                  onClick={() => handleFilterByColor(color)}
                  style={{
                    background: color,
                  }}
                  className={` w-[20px] h-[20px]`}
                />
              ))}
            </div>
          </Accordian>

          <Accordian title="Prices">
            <input
              id="rangeInput"
              type="range"
              min="0"
              max="1000"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRangeValue(parseInt(e.currentTarget.value))
              }
              value={rangeValue}
              className="w-full h-2 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer  "
            />
          </Accordian>
        </div>
      </div>
    </div>
  );
};
