import React from "react";
import NavbarSubMenuDesktop from "./NavbarSubMenuDesktop";
export default function NavbarMenuItem({ title, subMenu, link }) {
  const goPage = (url) => {
    window.location = `${url}`;
  };
  return (
    <>
      {subMenu.length > 0 ? (
        <div className="navbar-item position-relative">
          {title}
          <NavbarSubMenuDesktop subMenu={subMenu} />
        </div>
      ) : (
        <div
          className="navbar-item position-relative"
          onClick={() => goPage(link)}
        >
          {title}
          <NavbarSubMenuDesktop subMenu={subMenu} />
        </div>
      )}
    </>
  );
}
