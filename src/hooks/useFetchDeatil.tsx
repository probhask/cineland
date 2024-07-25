import { isInstanceAxiosError } from "@utils/isAxiosError";
import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetail = <T,>(endpoint: string) => {
  const [data, setData] = useState<T>();
  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      throw new Error(isInstanceAxiosError(error, "Error fetching data "));
    }
  };
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return data;
};

export default useFetchDetail;
