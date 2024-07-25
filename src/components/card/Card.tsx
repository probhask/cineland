import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useCineContext from "@context/context";
import { Movie } from "types";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
type Props = {
  data: Movie;
  trending?: boolean;
  index?: number;
  media_type?: string;
};

const Card = React.memo(({ data, trending, index, media_type }: Props) => {
  const { imageUrl } = useCineContext();
  const mediaType = data?.media_type ?? media_type;
  const { checkIsSaved, addWhishList, removeWhishList } = useCineContext();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/${mediaType}/${data?.id}`)}
      className="relative min-h-80 w-full min-w-[230px] max-w-[230px] overflow-hidden rounded transition-all hover:scale-105"
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
      <div
        className={`absolute top-4 flex w-full ${trending ? "justify-between" : "justify-end"} items-centers`}
      >
        {trending && index && (
          <div className="overflow-hidden rounded-r-full bg-black/60 px-4 py-1 backdrop:blur-3xl">
            #{index} Trending
          </div>
        )}
        <span className="mr-2 cursor-pointer text-3xl text-red-600 active:scale-90">
          {checkIsSaved(data?.id) ? (
            <BiSolidBookmark
              onClick={(e) => {
                e.stopPropagation();
                removeWhishList(data?.id);
              }}
            />
          ) : (
            <BiBookmark
              onClick={(e) => {
                e.stopPropagation();
                addWhishList({
                  id: data?.id,
                  media_type: data?.media_type,
                  poster_path: data?.poster_path,
                  name: data?.name,
                  title: data?.title,
                });
              }}
            />
          )}
        </span>
      </div>

      <div className="absolute bottom-0 h-16 w-full bg-black/60 p-2 backdrop:blur-3xl">
        <h2 className="line-clamp-1 text-clip text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
          <p className="rounded-full bg-black px-1 text-xs text-white">
            Rating: {Number(data?.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";
export default Card;
