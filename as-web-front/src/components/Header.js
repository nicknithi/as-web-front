/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import NavberDesktop from "./Navbar/NavberDesktop";
import axios from "axios";
export default function header() {
  const Navbar = [
    {
      title: "บริการ",
      subMenu: [
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
      ],
    },
    {
      title: "โปรโมชั่น",
      subMenu: [
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
      ],
    },
    {
      title: "ความรู้ด้านเทคนิค",
      subMenu: [
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
      ],
    },
    {
      title: "การบำรุงรักษาและแก้ไขปัญหา",
      subMenu: [
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
      ],
    },
    {
      title: "การติดตั้ง",
      subMenu: [
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
      ],
    },
    {
      title: "อะไหล่",
      subMenu: [
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
      ],
    },
    {
      title: "การรับประกัน",
      subMenu: [
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
      ],
    },
    {
      title: "สมาชิกการบริการ",
      subMenu: [
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
        {
          title: "menu1",
        },
      ],
    },
  ];
  useEffect(() => {});
  return (
    <div>
      <NavberDesktop NavbarItem={Navbar} />
    </div>
  );
}
