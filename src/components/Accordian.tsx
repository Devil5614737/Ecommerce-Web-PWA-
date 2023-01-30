import React, { ReactNode, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {motion} from 'framer-motion'



interface IProps {
  title: string;
  children: ReactNode;
}

export const Accordian = ({ title, children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b py-7 ">
      <header
        id="accordian"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex justify-between items-center"
      >
        <p className="text-3xl font-medium">{title}</p>
        <ChevronDownIcon width={20} height={20} />
      </header>
      {isOpen && (
        <motion.div
        initial={{ opacity:0}}
        animate={{  opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className=" mt-5 text-2xl leading-10">
          {children}
        </motion.div>
      )}
    </div>
  );
};
