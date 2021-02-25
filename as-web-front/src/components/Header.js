/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import NavberDesktop from "./Navbar/NavberDesktop";
import axios from "axios";
export default function header() {
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
      <NavberDesktop NavbarItem={[1, 2, 3, 4, 5]} />
    </div>
  );
}
