import React, { useState, createContext, useEffect } from "react";
import ordering from "../pizzaordering/ordering";
import Api from "../Api";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [pizzaProducts, setPizzaProducts] = useState([]);
  useEffect(function () {
    Api().get('/pizzas').then(pizzas => {
      const data = pizzas.data.map((item) => {
        return { ...item, id: item._id };
      });
      setPizzaProducts(data);
    });
  }, [])
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (id, quantity, selectedPizzaSize) => {
    let newPizzaArray = ordering.addPizzaToCart(id, quantity, selectedPizzaSize, cartItems, pizzaProducts);
    setCartItems(newPizzaArray);
  };

  const removeFromCart = (id, selectedPizzaSize) => {
    let newPizzaArray = ordering.removePizzaFromCart(id, selectedPizzaSize, cartItems);
    setCartItems(newPizzaArray);
  };

  const emptyCart = () => {
    setCartItems([])
  }

  const handleOrder = () => {
    const email = prompt("please enter your email: ", "");
    const adress = prompt("please enter your adress: ", "");
    Api().post('/orders', { email, adress, cartItems })
      .then(() => {
        emptyCart();
        alert('Fala sto kupuvavte od kaj nas');
      })
      .catch((e) => console.error(e));
  };

  const value = { pizzaProducts, cartItems, addToCart, removeFromCart, emptyCart, handleOrder, setPizzaProducts };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };