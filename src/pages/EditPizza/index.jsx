import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Api from "../../Api";
import { CartContext } from "../../context/cartContext";
import { TagContext } from "../../context/tagContext";

const EditPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState({});
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
    setPizza({ ...pizza, tags: newTags });
    console.log("Tags: ", tags);
    console.log("New Tags", newTags);
  };
  useEffect(function () {
    Api()
      .get(`/pizzas/${id}`)
      .then((response) => {
        setPizza(response.data);
      });
  }, []);
  const savePizza = async () => {
    //console.log("Saving pizza...");
    setLoading(true);
    const response = await Api().put(`/pizzas/${id}`, pizza);
    const { data } = response;
    //console.log(response);
    if (data.ok === 1) {
      const newPizzas = pizzaProducts.map((_pizza) =>
        _pizza._id === id ? pizza : _pizza
      );
      setPizzaProducts(newPizzas);
      //alert("Successfully saved pizza");
    }
    setLoading(false);
  };
  const handleFromChange = (e, key) => {
    const newPizza = { ...pizza };
    newPizza[key] = e.target.value;
    setPizza(newPizza);
  };
  const getCheckBoxes = (value) => {
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
        onChange={(e) => handleFromChange(e, key)}
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
