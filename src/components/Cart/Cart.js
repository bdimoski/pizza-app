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
        className={`fixed top-[8px] right-[64px] z-20 bg-${isOpen ? 'white' : 'transparent'} rounded-lg p-2 sm:p-2 flex flex-col items-center justify-center text-lg font-bold text-center text-black`}>
        <div className="relative" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-teal-700 shadow-lg cursor-pointer">
            <span className="text-2xl">
              <FiShoppingBag />
            </span>
          </div>
          {cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {cartItems.length}
            </div>
          )}
        </div>

        <div
          style={{
            display: !isOpen ? "none" : "block",
            padding: "20px",
            maxHeight: "300px",
            overflowY: "auto",
            marginTop: "16px",
            backgroundColor: "#ffff",
          }}
        >
          {cartItems.map((pizza) => (
            <div
              key={pizza.id + pizza.selectedPizzaSize}
              className="relative flex justify-between items-center mb-4 border-b pb-4"
            >
              <div className="w-3/5 p-4">
                <h3 className="text-lg font-bold text-center">{pizza.name}</h3>
                <div className="flex justify-around items-center">
                  <div className="text-gray-500 text-sm">{pizza.selectedPizzaSize}</div>
                  <div className="text-gray-500 text-sm">{pizza.quantity}x</div>
                </div>
              </div>
              <div className="w-[30%] text-right">
                <p className="text-gray-600 text-center">
                  {pizza.selectedPizzaSize === "Small" &&
                    "Price: " + pizza.priceSmall * pizza.quantity + "den"}
                  {pizza.selectedPizzaSize === "Large" &&
                    "Price: " + pizza.priceBig * pizza.quantity + "den"}
                </p>
              </div>
              <div className="w-[10%]">
                <button
                  onClick={() =>
                    removeFromCart(pizza.id, pizza.selectedPizzaSize)
                  }
                  className="absolute top-0 right-0 p-0.5 text-xl text-red-500 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleOrder}
            className="block mx-auto mt-4 px-4 py-2 rounded bg-green-500 text-white border-none cursor-pointer"
          >
            Order all
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;