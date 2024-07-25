import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "@constants/navigation";
import usericon from "../assets/usericon.png";

const Header = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const removeSpace = location?.search?.split("=")[1]?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <header className="fixed top-0 z-40 h-16 w-full bg-black bg-opacity-75 px-2">
      <div className="mx-auto flex h-full items-center px-3">
        <Link to={"/"} className="text-3xl font-bold text-[#EA9E3C]">
          CINELAND
        </Link>

        <nav className="ml-5 hidden items-center gap-1 lg:flex">
          {navigation.map((nav) => (
            <div key={nav.label}>
              <NavLink
                to={nav.href}
                className={({ isActive }) =>
                  `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`
                }
              >
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 md:gap-2 lg:gap-5">
          <form
            className="hidden items-center gap-2 lg:flex"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search here..."
              className="hidden border-none bg-transparent px-4 py-1 outline-none lg:block"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="text-wrap text-2xl">
              <IoSearchOutline />
            </button>
          </form>
          <div className="h-9 w-9 cursor-pointer transition-all active:scale-75">
            <img src={usericon} alt="useicon" className="h-full w-full" />
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
