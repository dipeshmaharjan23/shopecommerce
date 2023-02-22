import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { useRouter } from "next/router";
type Props = {};

const Search = (props: Props) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword.trim()) {
      router.push(`/search/${keyword}`);
    } else {
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between rounded-md">
        <input
          type="text"
          className="w-[500px] pl-4 outline-none py-2 rounded-l-md"
          placeholder="Enter product name"
          onChange={(e) => setKeyword(e.target.value)}
          // value={keyword}
        />
        <span className="bg-[#be4d25] flex items-center w-10 justify-center text-white text-xl rounded-r-md cursor-pointer">
          <Icon icon="material-symbols:search-rounded" />
        </span>
      </div>
    </form>
  );
};

export default Search;
