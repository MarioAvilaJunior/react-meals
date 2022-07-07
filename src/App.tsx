import React from "react";
import { Header } from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <>
      <Cart />
      <Header />;
      <Meals />
    </>
  );
};

export default App;
