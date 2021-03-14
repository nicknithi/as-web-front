/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import NavbarDesktop from "./Navbar/NavbarDesktop";
import NavbarMobile from "./Navbar/NavbarMobile";
import axios from "axios";
export default function header() {
  const Navbar = [
    {
      title: "บริการ",
      subMenu: [
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
      ],
    },
    {
      title: "โปรโมชั่น",
      subMenu: [
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
      ],
    },
    {
      title: "ความรู้ด้านเทคนิค",
      subMenu: [
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
      ],
    },
    {
      title: "การบำรุงรักษาและแก้ไขปัญหา",
      subMenu: [
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
      ],
    },
    {
      title: "การติดตั้ง",
      subMenu: [
        {
          title: "การติดตั้ง",
          link: "/installation",
        },
        {
          title: "menu1",
          link: "/installation",
        },
        {
          title: "menu1",
          link: "/installation",
        },
      ],
    },
    {
      title: "อะไหล่",
      subMenu: [
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
      ],
    },
    {
      title: "การรับประกัน",
      subMenu: [
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
      ],
    },
    {
      title: "สมาชิกการบริการ",
      subMenu: [
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
        {
          title: "menu1",
          link: "/",
        },
      ],
    },
  ];
  useEffect(() => {});
  return (
    <div>
      <NavbarDesktop NavbarItem={Navbar} />
      <NavbarMobile />
    </div>
  );
}
