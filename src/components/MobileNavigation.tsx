import { mobileNavigation } from "@constants/navigation";
import React from "react";
import { NavLink } from "react-router-dom";

const MobileNavigation = React.memo(() => {
  return (
    <section className="fixed bottom-0 z-10 h-14 w-full bg-black backdrop:blur-2xl lg:hidden">
      <div className="flex h-full items-center justify-between text-neutral-400">
        {mobileNavigation.map((nav) => (
          <NavLink
            key={nav.label + "mobilenavigation"}
            to={nav.href}
            className={({ isActive }) =>
              `flex h-full flex-col items-center justify-center px-3 ${isActive && "text-white"}`
            }
          >
            <div className="text-2xl">{nav.icon}</div>
            <p className="text-sm">{nav.label}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
});

MobileNavigation.displayName = "MobileNavigation";

export default MobileNavigation;
