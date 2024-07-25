import useFetchDetail from "@hooks/useFetchDeatil";
import { Movie, Trailer, TVSeries } from "types";
import React from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  data: TVSeries | Movie;
  close: () => void;
  mediaType: string;
};

const VideoPlay = React.memo(({ close, data, mediaType }: Props) => {
  const videoData = useFetchDetail<{ id: number; results: Trailer[] }>(
    `/${mediaType}/${data.id}/videos`,
  );

  return (
    <section className="fixed bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-neutral-700 bg-opacity-50">
      <div className="relative aspect-video max-h-[80vh] w-full max-w-screen-lg rounded bg-black">
        <button
          onClick={close}
          className="absolute -right-1 -top-6 z-50 text-3xl"
        >
          <IoClose />
        </button>

        {videoData && videoData?.results?.length > 0 ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl">
            N/A
          </div>
        )}
      </div>
    </section>
  );
});

VideoPlay.displayName = "VideoPlay";
export default VideoPlay;
