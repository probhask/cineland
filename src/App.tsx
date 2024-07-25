import Footer from "@components/Footer";
import Header from "@components/Header";
import MobileNavigation from "@components/MobileNavigation";
import { isInstanceAxiosError } from "@utils/isAxiosError";
import axios from "axios";
import useCineContext from "@context/context";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const { setBannerData, setImageUrl } = useCineContext();
  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");

      setBannerData(response.data.results);
    } catch (error) {
      isInstanceAxiosError(error, "Error fetching trending ");
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      setImageUrl(response.data.images.secure_base_url + "original");
    } catch (error) {
      isInstanceAxiosError(error, "Error fetching trending ");
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);
  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
