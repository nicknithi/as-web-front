/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import NavberDesktop from "./Navbar/NavberDesktop";
import axios from "axios";
export default function header() {
  const Navbar = [
    {
      title: "บริการ",
    },
    {
      title: "โปรโมชั่น",
    },
    {
      title: "ความรู้ด้านเทคนิค",
    },
    {
      title: "การบำรุงรักษาและแก้ไขปัญหา",
    },
    {
      title: "การติดตั้ง",
    },
    {
      title: "อะไหล่",
    },
    {
      title: "การรับประกัน",
    },
    {
      title: "สมาชิกการบริการ",
    },
  ];
  useEffect(() => {
    // fetch("https://randomuser.me/api/")
    //   .then((res) => res.json())
    //   .then((res) => console.log("nick", res));
    axios.get(`https://randomuser.me/api/`).then((res) => {
      const persons = res.data;
      console.log("nithi", persons);
    });
  });
  return (
    <div>
      <NavberDesktop NavbarItem={Navbar} />
    </div>
  );
}
