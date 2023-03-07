import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
import { CartContext } from "../../context/cartContext";
import bestSellerBagde from "../../assets/best-seller.png";
import vege from "../../assets/vegan.png";

const HomePage = (props) => {
  const { pizzaProducts, setPizzaProducts } = useContext(CartContext);
  //console.log(cartItems);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const tags = ["discount", "vege", "house-specialty"];
  const pageNumbers = [1, 2, 3];
  const [checkedState, setCheckedState] = useState(
    new Array(tags.length).fill(false)
  );
  const handleCheckedChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    searchPizzas(updatedCheckedState);
  };
  const handleKeyDown = (e) =>
    e.key === "Enter" ? searchPizzas(checkedState, page, search) : null;
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    searchPizzas(checkedState, page, e.target.value);
  };
  const searchPizzas = (_checkedState, page = 1, search = "") => {
    //fetches pizzas with filter
    const newTags = _checkedState
      .map((value, index) => (value ? tags[index] : null))
      .filter((tag) => tag !== null);
    // console.log('new tags: ', newTags);

    Api()
      .get(
        `/pizzas?search=${search}&tags=${JSON.stringify(newTags)}&page=${page}`
      )
      .then((response) => setPizzaProducts(response.data));
  };
  const handleGetPage = (pageNumber) => {
    setPage(pageNumber);
    searchPizzas(checkedState, pageNumber);
  };

  return (
    <div className="pb-[100px]">
      <div className="search flex items-center w-full">
        <div className="flex space-x-1 w-[40%] mx-auto">
          <input
            className="block w-full mx-auto px-4 py-2.5 my-4 text-[#020] bg-white border rounded-full focus:border-[#6C44EA] focus:ring-[#6C44EA] focus:outline-none focus:ring focus:ring-opacity-40"
            type="text"
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search pizzas..."
          />
        </div>
      </div>
      <div id="tags" className="flex justify-center flex-wrap mb-[16px]">
        {tags.map((tag, index) => (
          <li key={tag} className="flex items-center mr-[16px] my-[8px]">
            <label className="flex items-center text-[14px] text-[#555] cursor-pointer">
              <input
                className="hidden"
                type="checkbox"
                value={tag}
                checked={checkedState[index]}
                onChange={() => handleCheckedChange(index)}
              />
              <span></span>
              {tag}
            </label>
          </li>
        ))}
      </div>
      <div className="pages flex justify-center">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleGetPage(pageNumber)}
            className={`inline-block px-4 mx-0.5 py-2 bg-white text-black border-2 border-black cursor-pointer transition-all duration-300 ease-in-out ${
              pageNumber === page
                ? "bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-400 hover:to-teal-600 focus:from-teal-400 focus:to-teal-600 focus:outline-none"
                : "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-400 hover:to-gray-600 focus:from-gray-400 focus:to-gray-600 focus:outline-none"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-w-[1240px] mx-auto my-6"
        id="pizzaMenu"
      >
        {pizzaProducts.map((pizza) => (
          <div
            key={pizza._id}
            className="bg-white rounded-lg shadow-md overflow-hidden w-[250px] my-2 mx-auto"
          >
            <div className="relative">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-48 object-cover hover:transform hover:scale-105 transition-all duration-300 ease-in-out"
              />
              <div
                className={`absolute top-0 right-0 text-white font-bold py-3 px-4 rounded-bl-lg transition-all ${
                  !pizza.tags.includes("isBestSeller") &&
                  !pizza.tags.includes("vege")
                    ? "hidden"
                    : ""
                }`}
              >
                {pizza.tags.includes("isBestSeller") && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={bestSellerBagde}
                      alt="bestSeller"
                      className="w-12 h-12 animate-bounce"
                    />
                  </div>
                )}
                {pizza.tags.includes("vege") &&
                  !pizza.tags.includes("isBestSeller") && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={vege}
                        alt="vege"
                        className="w-12 h-12 animate-bounce"
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">{pizza.name}</h2>
              <p className="text-gray-700 text-base">{pizza.ingredients}</p>
              <div className="mt-4">
                <div className="text-lg font-bold text-gray-800">
                  {pizza.priceSmall} den - {pizza.priceBig} den
                </div>
                <div className="mt-4 flex justify-around">
                  <Link to={pizza.name}>
                    <button className="text-white py-2 px-4 rounded-full transition duration-300 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-400 hover:to-teal-600 focus:from-gray-400 focus:to-gray-600 focus:outline-none transform hover:-translate-y-1 hover:scale-110">
                      Buy Pizza
                    </button>
                  </Link>
                  {props.admin && (
                    <Link to={`/edit/${pizza._id}`}>
                      <button className="text-white py-2 px-6 rounded-full transition duration-300 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-400 hover:to-gray-600 focus:from-gray-400 focus:to-gray-600 focus:outline-none transform hover:-translate-y-1 hover:scale-110">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
