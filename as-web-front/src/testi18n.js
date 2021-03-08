import React from "react";
import "./App.css";
import { useTranslation } from "react-i18next";

function HeaderComponent() {
  const [t, i18n] = useTranslation("common");
  return (
    <div>
      <h1>{t("welcome.title", { framework: "React" })}</h1>
      <button onClick={() => i18n.changeLanguage("th")}>th</button>
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
      <div>{i18n.language}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <HeaderComponent />
    </div>
  );
}

export default App;
