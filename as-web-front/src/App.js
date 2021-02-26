import React from "react";
import Header from "./components/Header";
import DefaultLayout from "./layouts/Default";
import GoogleMap from "./components/map/googleMap";
export default function App() {
  return (
    <div>
      <Header />
      <DefaultLayout />
      <GoogleMap />
    </div>
  );
}
