import { LoaderFunctionArgs, redirect, useParams } from "react-router-dom";
import Card from "@components/card/Card";
import { useEffect, useState } from "react";
import { Movie } from "types";
import axios from "axios";
import { isInstanceAxiosError } from "@utils/isAxiosError";

const ExplorePage = () => {
  const params = useParams();

  const [data, setData] = useState<Movie[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [, setTotalPageNo] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });

      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      isInstanceAxiosError(error, "error fetching exlore page");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((preve) => preve + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full py-16">
      <div className="container mx-auto">
        <h3 className="my-5 text-center text-lg font-semibold capitalize lg:text-xl">
          Popular {params.explore} Show
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] justify-center gap-6 lg:justify-start">
          {data.map((exploredata, index) => {
            return (
              <Card
                key={exploredata.id + "explore" + params.explore + index}
                data={exploredata}
              />
            );
          })}
        </div>
        {loading && (
          <div className="my-10 w-full text-center text-2xl">Loading....</div>
        )}
      </div>
    </section>
  );
};

export default ExplorePage;

export const exploreLoader = async ({
  params,
}: LoaderFunctionArgs<{ explore: string }>) => {
  const validExploreValues = ["tv", "movie"];
  const { explore } = params;

  if (!validExploreValues.includes(explore as string)) {
    return redirect("/");
  }

  return null; // Return null if the parameter is valid
};
