import useCineContext from "@context/context";
import { Movie } from "types/index";

const useHandleWhishListBtn = () => {
  const { addWhishList, removeWhishList, checkIsSaved } = useCineContext();

  const handleWhishListBtn = (data: Movie) => {
    if (checkIsSaved(data?.id)) {
      removeWhishList(data?.id);
    } else {
      addWhishList({
        id: data?.id,
        media_type: data?.media_type,
        poster_path: data?.poster_path,
        name: data?.name,
        title: data?.title,
      });
    }
  };
  return handleWhishListBtn;
};

export default useHandleWhishListBtn;
