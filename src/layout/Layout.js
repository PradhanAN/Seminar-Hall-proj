import React from "react";
import ItemList from "./ItemList";
import Options from "./Options";
import Text from "./Text";
import Base from "../base/Base";

function Layout() {
  return (
    <>
      <Base>
        <Text />
        <ItemList />
        <Options />
      </Base>
    </>
  );
}

export default Layout;
