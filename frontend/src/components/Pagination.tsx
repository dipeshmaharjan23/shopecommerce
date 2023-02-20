import React from "react";

type Props = {
  postPerPage: number;
  totalPosts: number;
  paginate: Function;
  currentPage: number;
};

const Pagination = ({
  totalPosts,
  paginate,
  currentPage,
  postPerPage,
}: Props) => {
  const pageNumbers = Math.ceil(totalPosts / postPerPage);

  return (
    <div className="flex ">
      <button
        className="p-2 bg-secondary-color rounded-tl-md rounded-bl-md text-white"
        onClick={() => {
          if (currentPage >= 2) {
            paginate((prev: number) => prev - 1);
          }
        }}
      >
        Prev
      </button>
      <p className="px-4 py-2 bg-primary-color text-white">
        {currentPage} of {""}
        {pageNumbers}
      </p>
      <button
        className="p-2 bg-secondary-color rounded-tr-md rounded-br-md text-white"
        onClick={() => {
          if (currentPage < pageNumbers) {
            paginate((prev: number) => prev + 1);
          } else {
            paginate(1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
