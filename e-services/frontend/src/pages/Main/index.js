import React, { Fragment } from "react";
import { FaHome } from "react-icons/fa";

import Nav from "../../components/Nav";

import { Container, InfoPage } from "./styles";

function Main() {
  return (
    <Fragment>
      <Nav />
      <InfoPage>
        <FaHome size={18} />
        <h3>»»{"Home"}</h3>
      </InfoPage>
      <Container>
        <h1>Main</h1>
      </Container>
    </Fragment>
  );
}

export default Main;
