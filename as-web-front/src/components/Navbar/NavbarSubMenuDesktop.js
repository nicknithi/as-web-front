import React from "react";
import NavbarSubMenuDesktopItem from "./NavbarSubMenuDesktopItem";
export default function NavbarSubMenuDesktop(prop) {
  return (
    <div className="sub-menu position-absolute">
      {prop.subMenu.map((item, index) => (
        <NavbarSubMenuDesktopItem key={index} title={item.title} />
      ))}
    </div>
  );
}
