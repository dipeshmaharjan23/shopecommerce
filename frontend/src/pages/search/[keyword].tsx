import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

type Props = {};

const Search = (props: Props) => {
  const router = useRouter();
  const keyword = router.query?.keyword as string;
  console.log(keyword);
  return (
    <div>
      <Navbar />
      <Main keyword={keyword} />
    </div>
  );
};

export default Search;
