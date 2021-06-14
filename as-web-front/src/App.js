import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Warranty from "./layouts/Warranty";
import { useCookies } from "react-cookie";
import {
  BrowserRouter,
  Route,
  useHistory,
  HashRouter,
  Redirect,
} from "react-router-dom";
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
import TestRenderPdf from "./components/testRenderPdf";
import { useTranslation } from "react-i18next";
export default function App(props) {
  const [t, i18n] = useTranslation("common");
  const [cookies, setCookie] = useCookies(["as_lang"]);

  if (!cookies.as_lang) {
    setCookie("as_lang", "TH", {
      path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
    });
    window.location = `${process.env.REACT_APP_SUB_DIRECTORY}/th/Home_TH`;
  }
  if (window.location.pathname.split("/").length > 3) {
    var pathname = window.location.pathname.split("/")[3].toUpperCase();
    if (pathname === "th" || pathname === "en") {
      setCookie("as_lang", pathname, {
        path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
      });
    } else {
      // window.location = `${
      //   process.env.REACT_APP_SUB_DIRECTORY
      // }/${cookies.as_lang.toLowerCase()}/Home_${cookies.as_lang}`;
    }
  } else {
    window.location = `${
      process.env.REACT_APP_SUB_DIRECTORY
    }/${cookies.as_lang.toLowerCase()}/Home_${cookies.as_lang}`;
  }

  let lang = 1;
  if (cookies.as_lang) {
    lang = cookies.as_lang === "TH" ? 1 : 2;
  }

  useEffect(() => {
    if (!cookies.as_lang) {
      setCookie("as_lang", "TH", {
        path: `${process.env.REACT_APP_SUB_DIRECTORY}`,
      });
    }
  }, []);
  return (
    <div>
      <Loading />
      <BrowserRouter
        basename={`${process.env.REACT_APP_SUB_DIRECTORY}`}
        history={history}
      >
        {/* <Route exact path="/">
          <ExampleTest />
        </Route> */}
        <Route exact path="/warranty/test">
          <ExampleTest />
        </Route>
        <Route exact path="/test/pdf">
          {/* <ExampleTest /> */}
          <TestRenderPdf />
        </Route>
        <Route exact path="/:langContent/:customPath">
          <Header />
          <Content />
          <Footer />
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
          <Footer />
        </Route>
        <Route exact path="/">
          <Header />
          <Redirect
            exact
            from="/"
            to={lang === 1 ? "/th/Home_TH" : "/en/Home_EN"}
          />
        </Route>
      </BrowserRouter>
    </div>
  );
}
