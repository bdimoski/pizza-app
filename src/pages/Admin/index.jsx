import React, { useContext, useState } from "react";
import Api from "../../Api";
import { TagContext } from "../../context/tagContext";

const AdminPage = () => {
  const tagContext = useContext(TagContext);
  const tags = tagContext.tags.map((t) => t.tag);
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergens, setAllergens] = useState("");
  const [_id, setId] = useState("");
  const [priceSmall, setPriceSmall] = useState(0);
  const [priceBig, setPriceBig] = useState(0);
  const [image, setImage] = useState("");
  const [checkedState, setCheckedState] = useState(
    new Array(tags.length).fill(false)
  );
  //console.log("tags:", tags);
  //console.log("checkedState:", checkedState);
  const handleIdChange = (e) => setId(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleIngredientsChange = (e) => setIngredients(e.target.value);
  const handleAllergensChange = (e) => setAllergens(e.target.value);
  const handlePriceSmallChange = (e) => setPriceSmall(e.target.value);
  const handlePriceBigChange = (e) => setPriceBig(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  const addPizza = () => {
    const newTags = checkedState
      .map((value, index) => (value ? tags[index] : null))
      .filter((tag) => tag !== null);
    //console.log("newTags:", newTags);
    const pizza = {
      _id,
      name,
      ingredients,
      allergens,
      priceSmall,
      priceBig,
      image,
      tags: newTags,
    };

    Api()
      .get("/pizzas")
      .then((response) => {
        const pizzas = response.data;
        const pizzaIds = pizzas.map((pizza) => pizza._id);
        if (pizzaIds.includes(_id)) {
          alert("Error: Pizza with this ID already exists!");
        } else {
          Api()
            .post("/pizzas", pizza)
            .then(() => alert("Success!"))
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCheckedChange = (position) => {
    const updatedCheckedState = [...checkedState];
    updatedCheckedState[position] = !updatedCheckedState[position];
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="adminPanel bg-gray-200 rounded-md shadow-md p-4">
      <div className="flex flex-col space-y-4">
        <div className="mx-auto border border-gray-400 w-[60%] rounded-md p-2">
          <h3 className="text-lg font-bold text-white text-center bg-gray-600 rounded-md px-4 py-2 mb-4">
            Admin Panel
          </h3>
          <div className="grid grid-cols-2 gap-6 p-3">
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Pizza ID:</label>
              <input
                type="text"
                name="_id"
                onChange={handleIdChange}
                className="border rounded-md py-2 px-4 text-black"
                placeholder="Enter pizza ID..."
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Pizza Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleNameChange}
                className="border rounded-md py-2 px-4 text-black"
                placeholder="Enter pizza name..."
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Price for Small Pizza:</label>
              <input
                type="number"
                name="priceSmall"
                onChange={handlePriceSmallChange}
                className="border rounded-md py-2 px-4 text-black"
                placeholder="Enter price for small pizza..."
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Price for Large Pizza:</label>
              <input
                type="number"
                name="priceBig"
                onChange={handlePriceBigChange}
                className="border rounded-md py-2 px-4 text-black"
                placeholder="Enter price for large pizza..."
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 p-3">
            <label className="font-medium">Allergens:</label>
            <input
              type="text"
              name="allergens"
              onChange={handleAllergensChange}
              className="border rounded-md p-2 text-black"
              placeholder="Enter pizza allergens..."
            />
          </div>
          <div className="flex flex-col space-y-2 p-3">
            <label className="font-medium">Ingredients:</label>
            <input
              type="text"
              name="ingredients"
              onChange={handleIngredientsChange}
              className="border rounded-md p-2 text-black"
              placeholder="Enter pizza ingredients..."
            />
          </div>
          <div className="flex flex-col space-y-2 p-3 mb-2">
            <label className="font-medium">Image Link:</label>
            <input
              type="text"
              name="image"
              onChange={handleImageChange}
              className="border rounded-md p-2 text-black"
              placeholder="Enter pizza image link..."
            />
          </div>
          <div className="tags flex flex-wrap items-center bg-gray-300 rounded-lg m-3">
            {tags.map((tag, index) => (
              <label
                key={tag}
                className={`inline-flex items-center mx-auto rounded-full py-1 px-3 my-2 shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out ${
                  checkedState[index]
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <input
                  type="checkbox"
                  value={tag}
                  checked={checkedState[index] || false}
                  onChange={() => handleCheckedChange(index)}
                  className="hidden"
                />
                <span className="font-semibold p-1">{tag}</span>
              </label>
            ))}
          </div>
          <button
            className="bg-teal-500 text-white rounded-md px-16 py-3 mt-6 mb-4 block mx-auto"
            onClick={addPizza}
          >
            Add pizza
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;