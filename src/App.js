import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meal/Meals";
import CartCtxProvider from "./store/CartCtxProvider";


function App() {
  const [isShown, setIsShown] = useState(false);

  const onShowHandler = () => {
    setIsShown(true);
  }

  const onHideHandler = () => {
    setIsShown(false);
  }

  return (
    <CartCtxProvider>

      {isShown && <Cart onHide={onHideHandler} />}
      <Header onShow={onShowHandler} />
      <main>
        <Meals/>
      </main>
    </CartCtxProvider>
  );
}

export default App;
