import React, { useRef } from "react";
import Card from "@components/card/Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Movie } from "types";

type Props = {
  data: Movie[];
  heading: string;
  trending?: boolean;
  media_type?: string;
};

const HorizontalScrollCard = React.memo(
  ({ data = [], heading, trending = false, media_type }: Props) => {
    const conatinerRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
      if (conatinerRef.current) {
        conatinerRef.current.scrollLeft += 300;
      }
    };
    const handlePrevious = () => {
      if (conatinerRef.current) {
        conatinerRef.current.scrollLeft -= 300;
      }
    };
    return (
      <div className="container mx-auto my-10 min-h-28 lg:px-8">
        <h2 className="mb-3 text-xl font-bold capitalize text-white lg:text-2xl">
          {heading}
        </h2>
        <div className="relative">
          <div
            ref={conatinerRef}
            className="scroll-[none] scrollbar-none no-scrollbar relative z-10 grid grid-flow-col grid-cols-[repeat(auto-fit,230px)] gap-6 overflow-hidden overflow-x-scroll transition-all"
          >
            {data?.map((data, index) => {
              return (
                <Card
                  key={data.id + heading + index}
                  data={data}
                  index={index + 1}
                  trending={trending}
                  media_type={media_type}
                />
              );
            })}
          </div>

          <div className="absolute top-0 hidden h-full w-full items-center justify-between px-4 lg:flex">
            <button
              className="z-10 -ml-5 rounded-full bg-white p-1 text-black"
              onClick={handlePrevious}
            >
              <FaAngleLeft />
            </button>
            <button
              className="z-10 -mr-5 rounded-full bg-white p-1 text-xl text-black"
              onClick={handleNext}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

HorizontalScrollCard.displayName = "HorizontalScrollCard";
export default HorizontalScrollCard;
