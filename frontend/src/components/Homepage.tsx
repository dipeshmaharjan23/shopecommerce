import React from "react";
import Main from "./Main";
import Navbar from "./Navbar";
type Props = {};

const Homepage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
};

export default Homepage;
