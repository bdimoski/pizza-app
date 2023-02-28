import React, { useContext, useState } from "react";
import Api from "../../Api";
import { TagContext } from "../../context/tagContext";

const AdminPage = () => {
  const tagContext = useContext(TagContext);
  const tags = tagContext.tags.map((t) => t.tag);
  const [name, setName] = useState("");
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
  const handlePriceSmallChange = (e) => setPriceSmall(e.target.value);
  const handlePriceBigChange = (e) => setPriceBig(e.target.value);
  const handleImageChange = (e) => setImage(e.target.value);

  const handleSubmit = () => {
    const newTags = checkedState
      .map((value, index) => (value ? tags[index] : null))
      .filter((tag) => tag !== null);
    //console.log("newTags:", newTags);
    const pizza = { _id, name, priceSmall, priceBig, image, tags: newTags };
    //console.log("image64", image);
    Api()
      .post("/pizzas", pizza)
      .then(() => alert("Success!"))
      .catch((error) => console.log(error));
  };

  const handleCheckedChange = (position) => {
    const updatedCheckedState = [...checkedState]; // Create a copy of the array
    updatedCheckedState[position] = !updatedCheckedState[position]; // Modify the copy
    setCheckedState(updatedCheckedState); // Set the new state
  };

  return (
    <div id="admin">
      <label>
        _id:
        <input type="text" name="_id" onChange={handleIdChange} />
      </label>
      <label>
        Име на пица:
        <input type="text" name="name" onChange={handleNameChange} />
      </label>
      <label>
        Цена за мала пица:
        <input
          type="number"
          name="priceSmall"
          onChange={handlePriceSmallChange}
        />
      </label>
      <label>
        Цена за голема пица:
        <input type="number" name="priceBig" onChange={handlePriceBigChange} />
      </label>
      <label>
        Линк до слика:
        <input type="text" name="image" onChange={handleImageChange} />
      </label>
      {/* <label>
        Слика:
        <input type="file" name="file" onChange={handleImageUpload} />
      </label> */}
      <div id="tags">
        {tags.map((tag, index) => (
          <li key={tag}>
            <label>
              {tag}:
              <input
                type="checkbox"
                value={tag}
                checked={checkedState[index] || false}
                onChange={() => handleCheckedChange(index)}
              />
            </label>
          </li>
        ))}
      </div>
      <button onClick={handleSubmit}>Add pizza</button>
    </div>
  );
};

export default AdminPage;
