import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DefaultLayout from "./layouts/Default";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import Home from "./layouts/Home";
export default function App() {
  console.log(useHistory);
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/warranty">
          <DefaultLayout />
        </Route>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
