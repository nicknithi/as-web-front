import React from "react";

export default function NavbarSubMenuDesktopItem({ title, link }) {
  return (
    <a href={link} className="sub-menu-item">
      {title}
    </a>
  );
}
