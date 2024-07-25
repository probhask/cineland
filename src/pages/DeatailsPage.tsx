import HorizontalScrollCard from "@components/card/HorizontalScrollCard";
import Divider from "@components/Divider/Divider";
import useFetchDetail from "@hooks/useFetchDeatil";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoPlay from "@components/VideoPlay/VideoPlay";
import { CastMember, Movie, TVSeries } from "types";
import useCineContext from "@context/context";
import useFetch from "@hooks/useFetch";
import moment from "moment";
import { BiBookmarkPlus, BiSolidBookmark } from "react-icons/bi";
import useHandleWhishListBtn from "@hooks/useHandleWhishlistBtn";

const DeatailsPage = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState<TVSeries | Movie>();
  const { imageUrl, checkIsSaved } = useCineContext();
  const handleWhishListBtn = useHandleWhishListBtn();

  const param = useParams();

  const data = useFetchDetail<TVSeries | Movie>(
    `/${param?.explore}/${param?.id}`,
  );
  const castData = useFetchDetail<CastMember>(
    `/${param?.explore}/${param?.id}/credits`,
  );
  const simiarData = useFetch(`/${param?.explore}/${param?.id}/similar`);
  const recomendationData = useFetch(
    `/${param?.explore}/${param?.id}/recommendations`,
  );

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");

  const handlePlayVideo = (data: TVSeries | Movie | undefined) => {
    if (data) {
      setPlayVideoId(data);
      setPlayVideo(true);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [param]);

  return (
    <section>
      <div className="relative hidden h-[280px] w-full lg:block">
        <div className="h-full w-full">
          {data?.backdrop_path ? (
            <img
              src={imageUrl + data?.backdrop_path}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-600">
              {" "}
              No image found
            </div>
          )}
        </div>
        <div className="absolute top-0 bg-gradient-to-b from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto flex flex-col gap-5 px-3 py-16 lg:mt-2 lg:flex-row lg:gap-10 lg:py-0">
        <div className="relative mx-auto mb-28 h-80 min-h-80 w-60 min-w-60 lg:mx-0 lg:-mt-28 lg:mb-0">
          {data?.poster_path ? (
            <img
              src={imageUrl + data?.poster_path}
              alt=""
              className="h-80 w-60 object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-800">
              {" "}
              No image found
            </div>
          )}
          <button
            className="mt-3 w-full rounded bg-white from-red-500 to-orange-500 px-0 py-2 text-center text-lg font-bold text-black transition-all hover:scale-105 hover:bg-gradient-to-l"
            onClick={() => handlePlayVideo(data)}
          >
            Play Now
          </button>
          <button
            className="mt-3 flex w-full items-center justify-center rounded bg-white from-red-500 to-orange-500 px-0 py-2 text-center text-lg font-bold text-black transition-all hover:scale-105 hover:bg-gradient-to-l"
            onClick={() => handleWhishListBtn(data as Movie)}
          >
            <span className="text-xl">
              {checkIsSaved(data?.id as number) ? (
                <BiSolidBookmark />
              ) : (
                <BiBookmarkPlus />
              )}
            </span>
            <span className="ml-2">
              {checkIsSaved(data?.id as number) ? "Saved" : " Add to WhishList"}
            </span>
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white lg:text-4xl">
            {" "}
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400"> {data?.tagline}</p>

          <Divider />

          {/* vote */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration :{" "}
              {data?.runtime ? `${duration[0]}h ${duration[1]}m` : "N/A"}
            </p>
          </div>

          <Divider />

          {/* movie overveiw */}
          <div>
            <h3 className="mb-1 text-justify text-xl font-bold text-white">
              Overview
            </h3>
            <p> {data?.overview} </p>

            <Divider />

            <div className="my-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p>Status : {data?.status} </p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Status : {data?.revenue ? Number(data?.revenue) : "N/A"} </p>
            </div>

            <Divider />
          </div>

          {/* crew */}
          <div>
            <p>
              <span className="text-white">Director</span> :{" "}
              {castData && castData?.crew?.length > 0
                ? castData?.crew[0]?.name
                : "N/A"}
            </p>

            <Divider />
            <p>
              <span className="text-white">Writer</span> :{" "}
              {castData &&
              castData?.crew?.filter((el) => el?.job === "writer")?.length > 0
                ? castData?.crew
                    ?.filter((el) => el?.job === "writer")
                    ?.map((el) => el?.name)
                    ?.join(", ")
                : "N/A"}
            </p>
          </div>

          <Divider />
          {/* cast */}
          <h2 className="text-lg font-bold">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] justify-center gap-3">
            {castData?.cast?.filter((el) => el?.profile_path)?.length
              ? castData?.cast
                  ?.filter((el) => el?.profile_path)
                  ?.map((cast, index) => {
                    return (
                      <div key={"castDat" + index}>
                        <div>
                          <img
                            src={imageUrl + cast?.profile_path}
                            alt=""
                            className="h-24 w-20 rounded-full object-cover"
                          />
                        </div>
                        <p className="text-center text-sm font-bold">
                          {cast?.name}{" "}
                        </p>
                      </div>
                    );
                  })
              : "N/A"}
          </div>
        </div>
      </div>

      {/* similar */}

      <div>
        <HorizontalScrollCard
          data={simiarData}
          heading={`Similar ${param?.explore}`}
          media_type={param?.explore}
        />
        <HorizontalScrollCard
          data={recomendationData}
          heading={`Recommendation ${param?.explore}`}
          media_type={param?.explore}
        />
      </div>

      {/* play video */}
      {playVideo && playVideoId && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          mediaType={param?.explore as string}
        />
      )}
    </section>
  );
};

export default DeatailsPage;
