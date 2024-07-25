import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@components/card/Card";
import { Movie } from "types";
import axios from "axios";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const query = location?.search?.slice(3);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [location?.search]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((preve) => preve + 1);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.scroll(0, 0);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="px-2 py-16">
      {/* searchbar */}
      <div className="sticky top-[80px] z-30 mx-2 my-2 rounded-full lg:hidden">
        <input
          type="text"
          placeholder="search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="w-full rounded-full border-none bg-white px-4 py-1 text-lg text-neutral-900 outline-none"
        />
      </div>
      <div className="container mx-auto">
        <h3 className="my-5 px-3 text-center text-lg font-semibold capitalize lg:text-xl">
          Search Results
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] justify-center gap-6 lg:justify-start">
          {data.map((searchData, index) => {
            return (
              <Card key={searchData.id + "search" + index} data={searchData} />
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

export default SearchPage;
