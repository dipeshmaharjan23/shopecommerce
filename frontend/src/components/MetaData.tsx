import React from "react";
// import {helmet} from "react-helmet"

type Props = {
  title: string;
};

const MetaData = ({ title }: Props) => {
  return (
    <>
      <title>{`${title} - ShopIt`}</title>
    </>
  );
};

export default MetaData;
