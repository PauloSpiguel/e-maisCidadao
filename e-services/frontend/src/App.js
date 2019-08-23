import React from "react";
import Header from "./components/Header/index";
import GlobalStyle from "./styles/global";
import Routes from "./routes";

const App = () => (
  <>
    <GlobalStyle />
    <Header />
    <Routes />
  </>
);

export default App;
