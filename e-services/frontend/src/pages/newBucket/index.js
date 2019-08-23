import React, { Fragment } from "react";
import { FaHome } from "react-icons/fa";

import Nav from "../../components/Nav";

import { Container, InfoPage } from "../Main/styles";

export default function newBucket() {
  return (
    <Fragment>
      <Nav />
      <InfoPage>
        <FaHome size={18} />
        <h3>»»{"newBucket"}</h3>
      </InfoPage>
      <Container>
        <h1>newBucket</h1>
      </Container>
    </Fragment>
  );
}
