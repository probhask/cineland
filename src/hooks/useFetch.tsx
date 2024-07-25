import { Movie } from "types";
import { isInstanceAxiosError } from "@utils/isAxiosError";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint: string) => {
  const [data, setData] = useState<Movie[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data.results);
    } catch (error) {
      isInstanceAxiosError(error, "Error fetching data ");
    }
  };
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return data;
};

export default useFetch;
