import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router";
import { CartContext } from "../../context/cartContext";
import { TbHeartbeat } from 'react-icons/tb'

function Pizza() {
  const { pizzaName } = useParams();
  const { pizzaProducts, addToCart } = useContext(CartContext);

  const currentPizza = pizzaProducts.find(
    (e) => e.name.toLowerCase() === pizzaName.toLowerCase()
  );

  const [currentPrice, setCurrentPrice] = useState(
    (currentPizza && currentPizza.priceSmall) || ""
  );
  const [counter, setCounter] = useState(1);
  const [pizzaSize, setPizzaSize] = useState("Small");
  const pizzas = pizzaProducts.map((pizza) => pizza.name.toLowerCase());

  if (!pizzas.includes(pizzaName.toLowerCase())) {
    return <Navigate to={"pizza"} replace />;
  }

  return (
    <div key={currentPizza.id} className="grid grid-cols-1 md:grid-cols-2 items-center py-8 text-white">
      <div className="pizzaImage w-9/12 mx-auto">
        <img src={currentPizza.image} alt={currentPizza.name} className="w-full rounded-md shadow-lg" />
      </div>
      <div className="flex flex-col mx-auto justify-center p-6 w-9/12">
        <h1 className="text-3xl font-bold mb-4 w-full px-2">{currentPizza.name}</h1>
        <p className="mb-4 w-full p-2 text-lg">{currentPizza.ingredients}</p>
        <p className="text-gray-600 mb-4 w-full p-2 inline-flex"><TbHeartbeat size={20} className="text-orange-600 mr-1" />Allergens: {currentPizza.allergens}</p>
        <div className="mb-4 w-full p-2">
          <p className="text-2xl font-bold mb-2">{currentPizza.priceSmall} den-{currentPizza.priceBig} den</p>
          <p className="text-[12px] text-gray-600">Free delivery throughout Skopje</p>
        </div>
        <div className="mb-4 w-full p-2 flex">
          <h1 className="text-lg font-bold mb-2 my-auto">Size:</h1>
          <div className="flex items-center ml-8">
            <button
              onClick={() => {
                setCurrentPrice(currentPizza.priceSmall);
                setPizzaSize("Small");
              }}
              className={`mr-4 py-2 px-4 rounded-lg font-medium transition-colors duration-300 ${pizzaSize === "Small"
                ? "bg-teal-500 text-white cursor-default"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
              disabled={pizzaSize === "Small"}
            >
              SMALL
            </button>
            <button
              onClick={() => {
                setCurrentPrice(currentPizza.priceBig);
                setPizzaSize("Large");
              }}
              className={`py-2 px-4 rounded-lg font-medium transition-colors duration-300 ${pizzaSize === "Large"
                ? "bg-teal-500 text-white cursor-default"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
              disabled={pizzaSize === "Large"}
            >
              LARGE
            </button>
          </div>
        </div>
        <div className="mb-4 w-full p-2">
          <div className="flex flex-col justify-between">
            <h1 className="text-3xl font-bold">{currentPrice} ден</h1>
            <p className="text-[12px] text-gray-600">Free delivery throughout Skopje</p>
          </div>
        </div>

        <div className="my-6 w-full flex justify-between p-4">
          <div className="flex justify-between items-center border border-gray-300 rounded-lg shadow-md bg-gray-100">
            <div className="flex items-center">
              <button
                onClick={() => {
                  if (counter > 1) {
                    setCounter(counter - 1);
                  }
                }}
                className="border border-black text-black px-2 m-2 rounded-md font-medium transition-colors duration-300 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                -
              </button>
              <span className="px-4 text-black font-medium">{counter}</span>
              <button
                onClick={() => setCounter(counter + 1)}
                className="border border-black text-black px-2 m-2 rounded-md font-medium transition-colors duration-300 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                +
              </button>
            </div>
          </div>

          <button
            id="order-btn"
            onClick={() => addToCart(currentPizza._id, counter, pizzaSize)}
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-md shadow-md transition-colors duration-300"
          >
            Buy Pizza
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pizza;