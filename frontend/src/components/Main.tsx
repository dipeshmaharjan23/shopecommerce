import React from "react";
import Image from "next/image";

type Props = {};

const Main = (props: Props) => {
  return (
    <div>
      <h2 className="">Latest Products</h2>
      <div className="container mx-auto">
        <div className="">
          <Image
            src="https://unsplash.com/photos/ZhFoeRUDXhI"
            alt="product photo"
            width="280"
            height="280"
          />
        </div>
        <p></p>
        <div className="">stars</div>
        <span></span>
        <button></button>
      </div>
    </div>
  );
};

export default Main;
