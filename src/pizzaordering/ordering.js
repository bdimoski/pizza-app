const ordering = {
  addPizzaToCart(id, quantity, selectedPizzaSize, cartItems, pizzaProducts) {
    const pizzaToAdd = pizzaProducts.find(
      (pizza) => pizza.id === id);
    const addedPizza = cartItems.find(
      (pizza) => pizza.id === id && pizza.selectedPizzaSize === selectedPizzaSize);
    let pizzaCartItems;
    if (addedPizza) {
      addedPizza.quantity += quantity;
      pizzaCartItems = [
        ...cartItems,
      ];
    } else {
      pizzaCartItems = [
        ...cartItems,
        {
          ...pizzaToAdd,
          quantity,
          selectedPizzaSize,
        },
      ];
    }
    return pizzaCartItems;
  },

  removePizzaFromCart(id, selectedPizzaSize, cartItems) {
    const leftOverItems = cartItems.filter(
      (pizza) => !(pizza.id === id && pizza.selectedPizzaSize === selectedPizzaSize)
    );
    return leftOverItems;
  },
};
export default ordering;
