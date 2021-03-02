import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DefaultLayout from "./layouts/Default";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Forgotpassowrd from "./layouts/Forgotpassowrd";
import TestApi from "./components/testApi";
import FormComfirm from "./components/Warranty/FormComfirm";
import history from "./history";
export default function App() {
  console.log(useHistory);
  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter history={history}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/warranty">
          <DefaultLayout />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forgotpassowrd">
          <Forgotpassowrd />
        </Route>
        <Route exact path="/testApi">
          <TestApi />
        </Route>
        <Route exact path="/warranty/confirm">
          <FormComfirm />
        </Route>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
