import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Api from "../../Api";
import { CartContext } from "../../context/cartContext";
import { TagContext } from "../../context/tagContext";

const EditPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState({ tags: [] });
  const [loading, setLoading] = useState(false);
  const tagContext = useContext(TagContext);
  const { pizzaProducts, setPizzaProducts } = useContext(CartContext);
  const tags = tagContext.tags.map((tag) => tag.tag);
  //console.log('Tags:', tags);
  const [checkedState, setCheckedState] = useState(
    new Array(tags.length).fill(false)
  );
  const handleCheckedState = (position) => {
    const updatedCheckedState = [...checkedState];
    //console.log(updatedCheckedState);
    updatedCheckedState[position] = !updatedCheckedState[position];
    setCheckedState(updatedCheckedState);
    const newTags = updatedCheckedState
      .map((isChecked, index) => (isChecked ? tags[index] : null))
      .filter(Boolean);
    setPizza({ ...pizza, tags: newTags.length ? newTags : [] });
    // console.log("Tags: ", tags);
    // console.log("New Tags", newTags);
  };

  useEffect(() => {
    async function fetchPizza() {
      try {
        setLoading(true);
        const response = await Api().get(`/pizzas/${id}`);
        setPizza(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPizza();
  }, [id]);

  useEffect(() => {
    const tags = tagContext.tags.map((t) => t.tag);
    if (!pizza.tags) {
      setPizza({ ...pizza, tags: tags });
    }
    const tagChecks = tags.map((tag) => {
      if (pizza.tags && pizza.tags.includes(tag)) {
        return true;
      } else {
        return false;
      }
    });
    setCheckedState(tagChecks);
  }, [tagContext.tags, pizza.tags, pizza]);

  const handleInputChange = (e, key) => {
    const newPizza = { ...pizza };
    newPizza[key] = e.target.value;
    setPizza(newPizza);
  };
  const getCheckBoxes = () => {
    //console.log(value)
    return (
      <div className="flex flex-wrap items-center my-4 gap-4">
        {tags.map((tag, index) => {
          return (
            <label
              key={index}
              className={`inline-flex items-center mx-auto rounded-full py-1 px-3 my-2 shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out ${
                checkedState[index]
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <input
                type="checkbox"
                checked={checkedState[index] || false}
                onChange={() => handleCheckedState(index)}
                className="hidden"
              />
              <span className="font-semibold p-0.5">{tag}</span>
            </label>
          );
        })}
      </div>
    );
  };
  const createInput = (key, value) => {
    let inputType;
    if (typeof value === "string") {
      inputType = "text";
    } else if (typeof value === "number") {
      inputType = "number";
    } else if (typeof value === "object") {
      return getCheckBoxes(value);
    }
    return (
      <div key={key} className="flex flex-col space-y-2">
        <label htmlFor={key} className="font-medium">
          {key}:
        </label>
        <input
          key={key}
          type={inputType}
          value={value || ""}
          onChange={(e) => handleInputChange(e, key)}
          className="border rounded-md p-2 text-black"
        />
      </div>
    );
  };
  const savePizza = async () => {
    // Validate user inputs
    if (!pizza.name.trim()) {
      alert("Please enter a valid pizza name.");
      return;
    }
    const priceRegex = /^[1-9]\d*$/;
    // console.log(pizza);
    if (!priceRegex.test(pizza.priceSmall, pizza.priceBig)) {
      alert("Please enter a valid price.");
      return;
    }

    setLoading(true);

    // Fetch all pizzas
    const response = await Api().get("/pizzas");
    const pizzas = response.data;

    // Check if a pizza with the same ID already exists
    if (pizzas.some((p) => p._id === id && p._id !== pizza._id)) {
      alert(
        `A pizza with ID ${id} already exists. Please choose a different ID.`
      );
      setLoading(false);
      return;
    }

    // Send the PUT request
    const putResponse = await Api().put(`/pizzas/${id}`, pizza);
    const { data } = putResponse;
    if (data.ok === 1) {
      const newPizzas = pizzaProducts.map((_pizza) =>
        _pizza._id === id ? pizza : _pizza
      );
      setPizzaProducts(newPizzas);
      alert("Successfully updated pizza");
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div>
        <div className="progress">
          <h2 className="loading">Loading</h2>
          <div className="color"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="editPizza bg-gray-200 rounded-md shadow-md p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1 text-black w-[60%] mx-auto">
          <div className="border border-gray-400 rounded-md p-2">
            <h3 className="text-lg font-bold text-white text-center bg-gray-600 rounded-md px-4 py-2 mb-4">
              Pizza Details JSON
            </h3>
            {Object.entries(pizza).map(([key, value]) => (
              <div key={key} className="flex flex-row space-x-1">
                <span className="text-gray-500">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"{key}"&nbsp;&nbsp;:
                </span>
                <span>{JSON.stringify(value)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="editForm mx-auto border border-gray-400 w-[60%] rounded-md p-2">
          <h3 className="text-lg font-bold text-white text-center bg-gray-600 rounded-md px-4 py-2 mb-4">
            Edit Pizza
          </h3>
          {Object.keys(pizza).map((key) => createInput(key, pizza[key]))}
          <button
            className="bg-teal-500 text-white rounded-md px-16 py-3 mt-4 block mx-auto"
            onClick={savePizza}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPizza;