import { Icon } from "@iconify-icon/react";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <div className="flex h-24 justify-between bg-[#2596be] items-center px-4 w-100%">
        <div className="space-x-1 flex items-center cursor-pointer">
          <Icon
            icon="mdi:cart-heart"
            className="text-3xl text-secondary-color"
          />
          <p className="text-3xl text-white">
            Shop<span className="text-secondary-color">IT</span>
          </p>
        </div>
        <div className="flex justify-between rounded-md">
          <input
            type="text"
            className="w-[500px] pl-4 outline-none py-2 rounded-l-md"
            placeholder="Enter product name"
          />
          <span className="bg-[#be4d25] flex items-center w-10 justify-center text-white text-xl rounded-r-md cursor-pointer">
            <Icon icon="material-symbols:search-rounded" />
          </span>
        </div>
        <div className="space-x-8 pr-14">
          <button className="bg-secondary-color px-6 py-2 rounded-md text-white text-xl">
            Login
          </button>
          <button className="text-white text-2xl">Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
