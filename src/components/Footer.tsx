import React from "react";
import { Link } from "react-router-dom";

const Footer = React.memo(() => {
  return (
    <footer className="bg-neutral-600 bg-opacity-35 py-2 text-center text-neutral-400">
      <div className="flex items-center justify-center gap-4">
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <p className="text-sm">@ Copyright to cineland corp.</p>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
