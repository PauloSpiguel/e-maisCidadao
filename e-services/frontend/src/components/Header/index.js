import React, { Fragment } from "react";

import Header from "./Styles";
import Logotipo from "../Logotipo";

const header = () => {
  return (
    <Fragment>
      <Header>
        <Logotipo />
      </Header>
    </Fragment>
  );
};

export default header;
