import { PiTelevision } from "react-icons/pi";
import { BiSolidBookmark, BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { HiHome } from "react-icons/hi";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <PiTelevision />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <BiSolidMoviePlay />,
  },
  {
    label: "Whishlist",
    href: "whishlist",
    icon: <BiSolidBookmark />,
  },
];
export const mobileNavigation = [
  { label: "Home", href: "/", icon: <HiHome /> },
  ...navigation,
  { label: "search", href: "/search", icon: <IoSearchOutline /> },
];
