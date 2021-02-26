import React from "react";
import NavbarMenuItem from "./NavbarMenuItem";
export default function NavbarDesktopMenu({ menu }) {
  return (
    <div className="d-flex justify-content-between w-100">
      {menu.map((item, index) => (
        <NavbarMenuItem key={index} title={item.title} />
      ))}
    </div>
  );
}
