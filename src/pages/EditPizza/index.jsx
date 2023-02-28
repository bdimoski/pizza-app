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

  const handleInputChange = (e, key) => {
    const newPizza = { ...pizza };
    newPizza[key] = e.target.value;
    setPizza(newPizza);
  };
  const getCheckBoxes = () => {
    //console.log(value)
    return (
      <div>
        {tags.map((tag, index) => {
          return (
            <label key={index}>
              {tag}:
              <input
                type="checkbox"
                checked={checkedState[index] || false}
                onChange={() => handleCheckedState(index)}
              />
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
      <input
        key={key}
        type={inputType}
        value={value || ""}
        onChange={(e) => handleInputChange(e, key)}
      />
    );
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
    <div id="editPizza">
      {JSON.stringify(pizza)}
      <div className="editForm">
        {Object.keys(pizza).join(", ")}
        {Object.keys(pizza).map((key) => createInput(key, pizza[key]))}
        <button onClick={savePizza}>Save</button>
      </div>
    </div>
  );
};

export default EditPizza;
