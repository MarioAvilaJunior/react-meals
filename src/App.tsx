import React from "react";
import { Header } from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import CheckoutForm from "./components/UI/CheckoutForm";

export const databaseURL =
  "https://react-academind-session15-default-rtdb.firebaseio.com/";

const App = (): JSX.Element => {
  const [showCart, setShowCart] = React.useState<boolean>(true);
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const closeCart = (): void => {
    setShowCart(false);
  };

  const closeForm = (): void => {
    setShowForm(false);
  };

  const openCart = (): void => {
    setShowCart(true);
  };

  const openForm = (): void => {
    setShowForm(true);
  };

  return (
    <CartProvider>
      {showForm && <CheckoutForm onClose={closeForm} />}
      {showCart && <Cart onCloseCart={closeCart} onOpenForm={openForm} />}
      <Header onShowCart={openCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
