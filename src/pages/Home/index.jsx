import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api";
import { CartContext } from "../../context/cartContext";

const HomePage = (props) => {
  const { pizzaProducts, setPizzaProducts } =
    useContext(CartContext);
  //console.log(cartItems);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const tags = ["discount", "vege", "house-specialty"];
  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    e.key === "Enter" ? searchPizzas(checkedState) : null;
  const handleSearchChange = (e) => setSearch(e.target.value);
  const searchPizzas = (_checkedState, page = 1) => {
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
    <div>
      <div id="search">
        Search:{" "}
        <input
          type="text"
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div id="tags">
        {tags.map((tag, index) => (
          <li key={tag}>
            <label>
              {tag}:
              <input
                type="checkbox"
                value={tag}
                checked={checkedState[index]}
                onChange={() => handleCheckedChange(index)}
              />
            </label>
          </li>
        ))}
      </div>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handleGetPage(pageNumber)}>
          {pageNumber === page ? <b>{pageNumber}</b> : pageNumber}
        </button>
      ))}

      <div id="pizzaMenu">
        {pizzaProducts.map((pizza) => (
          <div key={pizza._id} className="product">
            <div className="priceTag">
              {pizza.priceSmall} ден - {pizza.priceBig} ден
            </div>
            <Link to={pizza.name}>
              <img src={pizza.image} alt={pizza.name} />
            </Link>
            <h2>{pizza.name}</h2>
            <p>{pizza.ingredients}</p>
            <Link to={pizza.name}>
              <button>Buy Pizza</button>
            </Link>
            {props.admin ? (
              <Link to={`/edit/${pizza._id}`}>
                <button>Edit Pizza</button>
              </Link>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
