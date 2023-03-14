const ordering = {
  addPizzaToCart(id, quantity, selectedPizzaSize, cartItems, pizzaProducts) {
    //console.log(id)
    const pizzaToAdd = pizzaProducts.find(
      (pizza) => pizza._id === id);
    const addedPizza = cartItems.find(
      (pizza) => pizza._id === id && pizza.selectedPizzaSize === selectedPizzaSize);
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
    //console.log(pizzaCartItems)
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