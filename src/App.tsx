import React from "react";
import { Header } from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = (): JSX.Element => {
  const [showCart, setShowCart] = React.useState<boolean>(true);
  const closeCart = (): void => {
    setShowCart(false);
  };

  const openCart = (): void => {
    setShowCart(true);
  };

  return (
    <CartProvider>
      {showCart && <Cart onCloseCart={closeCart} />}
      <Header onShowCart={openCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
