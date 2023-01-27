import React from "react";
import { NavLink, Link } from "react-router-dom";
const Header = () => {
  const links = document.querySelectorAll("a");
  links.forEach((item) =>
    item.addEventListener("click", () => {
      links.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
    })
  );
  return (
    <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/movies"}>Movie</NavLink>
      <NavLink to={"/tv"}>Tv Series</NavLink>
    </header>
  );
};

export default Header;
