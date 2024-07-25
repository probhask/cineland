// context/cineContext.tsx
import type { Movie, WhishList } from "types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextDataTypes {
  bannerData: Movie[];
  setBannerData: React.Dispatch<React.SetStateAction<Movie[]>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  whishList: WhishList[];
  addWhishList: (movie: WhishList) => void;
  checkIsSaved: (id: number) => boolean;
  removeWhishList: (movieId: number) => void;
}
// create context
const cineContext = createContext<ContextDataTypes | undefined>(undefined);

// loscatsotrage getWhishList
const getLocalWhishList = (): WhishList[] => {
  const raw = localStorage?.getItem("cineland_whishlist");
  if (raw) {
    const parse = JSON.parse(raw);
    return parse;
  }
  return [];
};

// provider
export const CineContextProvider = ({ children }: { children: ReactNode }) => {
  const [bannerData, setBannerData] = useState<Movie[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [whishList, setWhishList] = useState<WhishList[]>(getLocalWhishList());

  const checkIsSaved = (id: number): boolean => {
    let isFound = false;
    whishList.forEach((element) => {
      if (element.id === id) {
        isFound = true;
        return isFound;
      }
    });
    return isFound;
  };

  const addWhishList = (movie: WhishList) => {
    const prev = getLocalWhishList();
    setWhishList((prev) => [...prev, movie]);
    localStorage?.setItem(
      "cineland_whishlist",
      JSON.stringify([...prev, movie]),
    );
  };
  const removeWhishList = (movieId: number) => {
    const updatedList = whishList.filter((list) => list.id !== movieId);
    setWhishList(updatedList);
    localStorage?.setItem("cineland_whishlist", JSON.stringify(updatedList));
  };
  return (
    <cineContext.Provider
      value={{
        bannerData,
        setBannerData,
        imageUrl,
        setImageUrl,
        whishList,
        addWhishList,
        checkIsSaved,
        removeWhishList,
      }}
    >
      {children}
    </cineContext.Provider>
  );
};

// provider hook
const useCineContext = () => {
  const context = useContext(cineContext);
  if (!context) {
    throw new Error("useExample must be used within an ExampleProvider");
  }
  return context;
};

export default useCineContext;
