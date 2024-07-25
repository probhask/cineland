import useCineContext from "@context/context";
import React from "react";
import { BiSolidBookmark } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const WhishList = React.memo(() => {
  const { whishList, removeWhishList, imageUrl } = useCineContext();
  const navigate = useNavigate();
  return (
    <div className="h-full w-full py-16">
      <h1 className="mb-6 mt-3 text-center text-lg font-bold md:text-2xl">
        WhishList
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,230px)] justify-center gap-4 lg:justify-start">
          {whishList?.map((data, index) => {
            return (
              <div
                key={data?.id + "whishlist" + index}
                className="relative min-h-60 w-full min-w-[200px] max-w-[200px] overflow-hidden rounded bg-neutral-700 transition-all hover:scale-[1.02]"
                onClick={() => navigate(`/${data?.media_type}/${data?.id}`)}
              >
                {data?.poster_path ? (
                  <img
                    src={imageUrl + data?.poster_path}
                    alt=""
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-800">
                    No image found
                  </div>
                )}
                <span
                  className="absolute right-2 top-2 z-40 cursor-pointer text-4xl active:scale-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeWhishList(data?.id);
                  }}
                >
                  <BiSolidBookmark />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

WhishList.displayName = "WhishList";

export default WhishList;
