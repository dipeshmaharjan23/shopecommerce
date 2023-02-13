import { Icon } from "@iconify-icon/react";
import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex items-center flex-col gap-4 justify-center ml-auto mr-auto mt-[20%] w-[80px] h-[80px] pl-0">
      <Icon
        icon="eos-icons:bubble-loading"
        className=" text-6xl text-secondary-color"
      />
      <h1 className="text-xl text-center">Loading...</h1>
    </div>
  );
};

export default Loader;
