import React, { useContext, useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { CartContext } from "../../context/cartContext";
import { FiShoppingBag } from 'react-icons/fi';
const Cart = () => {
  const { cartItems, removeFromCart, handleOrder } = useContext(CartContext);
  //console.log(cartItems);
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef();
  useClickOutside(cartRef, () => setIsOpen(false));

  return (
    <div>
      {isOpen && (
        <div
          className="test"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            backgroundColor: `rgba(0,0,0,0.4)`,
            zIndex: 10,
          }}
        ></div>
      )}
      <div
        id="cart"
        ref={cartRef}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 20,
          backgroundColor: "white",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            display: 'flex',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {" "}
          <FiShoppingBag /> {cartItems.length && cartItems.length}
        </div>

        <div
          style={{
            display: !isOpen ? "none" : "block",
          }}
        >
          {cartItems.map((pizza) => (
            <div key={pizza.id + pizza.selectedPizzaSize}>
              <h2>
                {pizza.name}{" "}
                <button
                  onClick={() =>
                    removeFromCart(pizza.id, pizza.selectedPizzaSize)
                  }
                >
                  ❌
                </button>
              </h2>
              <h2>{pizza.selectedPizzaSize}</h2>
              <div>
                {pizza.selectedPizzaSize === "мала" &&
                  "Price:" +
                  pizza.priceSmall * pizza.quantity +
                  "den  -  " +
                  pizza.quantity}
              </div>
              <div>
                {pizza.selectedPizzaSize === "голема" &&
                  "Price" +
                  pizza.priceBig * pizza.quantity +
                  "den  -  " +
                  pizza.quantity}
              </div>
            </div>
          ))}
          <button onClick={handleOrder} style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }}>Order all</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;