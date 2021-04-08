import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Warranty from "./layouts/Warranty";
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Forgotpassowrd from "./layouts/Forgotpassowrd";
import TestApi from "./components/testApi";
import FormComfirm from "./components/Warranty/FormComfirm";
import history from "./history";
import ExampleTest from "./components/exampleTest";
import Testi18n from "./testi18n";
import Register from "./layouts/Register";
import ProfileHome from "./layouts/ProfileHome";
import Installation from "./layouts/Installation";
import Spare from "./layouts/Spare";
import EditProfile from "./layouts/EditProfile";
import TestDataTable from "./layouts/TestDataTable";
import Content from "./layouts/Content";
import SpareListByModel from "./layouts/SpareListByModel";
import SpareDetail from "./layouts/SpareDetail";
import Maintain from "./layouts/Maintain";
import Loading from "./components/Loading";
import testpicture from "./layouts/testPicture";
export default function App(props) {
  console.log("55555ooo0", props);
  const [cookies, setCookie] = useCookies(["as_lang"]);
  const pathWithOutDomain = window.location.href.split("/").reverse()[0];
  if (!pathWithOutDomain) {
    if (cookies.as_lang === "TH") {
      window.location = "/หน้าแรก";
    } else if (cookies.as_lang === "EN") {
      window.location = "/home";
    }
  }
  return (
    <div>
      <Loading />

      <BrowserRouter history={history}>
        <Route exact path="/warranty/test">
          <ExampleTest />
        </Route>
        <Route exact path="/test/picture">
          <testPicture />
        </Route>

        {/* <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/warranty">
          <Warranty />
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
        <Route exact path="/warranty/test">
          <ExampleTest />
        </Route>
        <Route exact path="/warranty/testi18n">
          <Testi18n />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/installation">
          <Installation />
        </Route>
        <Route exact path="/spare">
          <Spare />
        </Route>
        <Route exact path="/profile">
          <ProfileHome />
        </Route>
        <Route exact path="/edit-profile">
          <EditProfile />
        </Route>
        <Route exact path="/datatable">
          <TestDataTable />
        </Route>
        {/* <Route exact path="/SpareListByModel">
          <SpareListByModel />
        </Route>
        <Route exact path="/SpareDetail">
          <SpareDetail />
        </Route> */}
        {/* <Route exact path="/maintain">
          <Maintain />
        </Route>  */}
        <Route exact path="/:customPath">
          <Header />
          <Content />
        </Route>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
