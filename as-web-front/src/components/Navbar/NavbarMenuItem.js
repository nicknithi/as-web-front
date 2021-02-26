import React from "react";
import NavbarSubMenuDesktop from "./NavbarSubMenuDesktop";
export default function NavbarMenuItem({ title, subMenu }) {
  return (
    <div className="navbar-item position-relative">
      {title}
      <NavbarSubMenuDesktop subMenu={subMenu} />
    </div>
  );
}
