import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useCineContext from "@context/context";
import { BiBookmarkPlus, BiSolidBookmark } from "react-icons/bi";
import useHandleWhishListBtn from "@hooks/useHandleWhishlistBtn";

const HomeBanner = React.memo(() => {
  const { bannerData, imageUrl, checkIsSaved } = useCineContext();
  const handleWhishListBtn = useHandleWhishListBtn();

  const [currentImage, setCurrentImage] = useState(0);
  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  };
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    } else {
      setCurrentImage(bannerData.length - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData, imageUrl, currentImage]);
  return (
    <section className="h-full w-full">
      <div className="flex max-h-[90vh] min-h-[90vh] overflow-hidden">
        {bannerData?.map((data, index) => {
          return (
            <div
              className="group relative min-h-[450px] min-w-full overflow-hidden transition-all lg:min-h-full"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
              key={data?.id + "HomeBanner" + index}
            >
              <div className="h-full w-full">
                <img
                  src={imageUrl + data?.backdrop_path}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* button next and previous image*/}
              <div className="absolute top-0 hidden h-full w-full items-center justify-between px-4 group-hover:lg:flex">
                <button
                  className="z-10 rounded-full bg-white p-1 text-xl text-black"
                  onClick={handlePrevious}
                >
                  <FaAngleLeft />
                </button>
                <button
                  className="z-10 rounded-full bg-white p-1 text-xl text-black"
                  onClick={handleNext}
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 h-full w-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="container mx-auto">
                <div className="absolute bottom-0 w-full max-w-md px-3">
                  <h2 className="text-2xl font-bold text-white drop-shadow-2xl lg:text-4xl">
                    {data?.title || data?.name}
                  </h2>
                  <p className="my-2 line-clamp-3 text-clip">
                    {data?.overview}
                  </p>

                  <div className="flex items-center gap-4">
                    <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View: {Number(data?.popularity).toFixed(0)}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to={"/" + data?.media_type + "/" + data?.id}
                      className="mt-4 block w-fit rounded bg-white from-red-500 to-orange-700 px-4 py-2 font-bold text-black shadow-md transition-all hover:scale-105 hover:bg-gradient-to-l"
                    >
                      Play Now
                    </Link>
                    <button
                      className="mt-4 flex w-fit cursor-pointer items-center rounded bg-white from-red-500 to-orange-700 px-4 py-2 font-bold text-black shadow-md transition-all hover:scale-105 hover:bg-gradient-to-l"
                      onClick={() => handleWhishListBtn(data)}
                    >
                      <span className="text-xl">
                        {checkIsSaved(data?.id) ? (
                          <BiSolidBookmark />
                        ) : (
                          <BiBookmarkPlus />
                        )}
                      </span>
                      <span className="ml-2">
                        {checkIsSaved(data?.id) ? "Saved" : " Add to WhishList"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

HomeBanner.displayName = "HomeBanner";

export default HomeBanner;
