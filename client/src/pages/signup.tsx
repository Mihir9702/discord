import React from "react";
import Authentication from "src/components/Authentication";
import { Signup } from "src/components/Authentication";

export default () => {
  return (
    <Authentication title="Signup">
      <Signup />
    </Authentication>
  );
};
