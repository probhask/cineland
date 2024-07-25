import HomeBanner from "@components/Banner/HomeBanner";
import HorizontalScrollCard from "@components/card/HorizontalScrollCard";
import useCineContext from "@context/context";
import useFetch from "@hooks/useFetch";
import { useEffect } from "react";

const Home = () => {
  const { bannerData: trendingData } = useCineContext();
  const nowPlayingData = useFetch("/movie/now_playing");
  const topRatedData = useFetch("/movie/top_rated");
  const popularTvShowData = useFetch("/tv/popular");
  const onTheAirShowData = useFetch("/tv/on_the_air");
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="">
      <HomeBanner />
      {/* trending */}
      <HorizontalScrollCard
        data={trendingData}
        heading="Trending"
        trending={true}
      />
      {/* now playing */}
      <HorizontalScrollCard
        data={nowPlayingData}
        heading="Now Playing"
        media_type="movie"
      />

      {/* top rated movies */}
      <HorizontalScrollCard
        data={topRatedData}
        heading="Top Rated Movies"
        media_type="movie"
      />

      {/* popular tv show */}
      <HorizontalScrollCard
        data={popularTvShowData}
        heading="Popular TV Shows"
        media_type="tv"
      />

      {/* on Air */}
      <HorizontalScrollCard
        data={onTheAirShowData}
        heading="On The Air"
        media_type="tv"
      />
    </div>
  );
};

export default Home;
