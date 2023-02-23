import React, { useContext, useState } from "react";
import Api from "../../Api";
import { TagContext } from "../../context/tagContext";

const AdminPage = () => {
  const tagContext = useContext(TagContext);
  const tags = tagContext.tags.map(_tag => _tag.tag);
  const [name, setName] = useState("");
  const [_id, setId] = useState("");
  const [priceSmall, setPriceSmall] = useState(0);
  const [priceBig, setPriceBig] = useState(0);
  const [image, setimage] = useState("");
  const [checkedState, setCheckedState] = useState(
    new Array(tags.length).fill(false)
  );
  const handleIdChange = (e) => setId(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceSmallChange = (e) => setPriceSmall(e.target.value);
  const handlePriceBigChange = (e) => setPriceBig(e.target.value);
  const handleImageChange = (e) => setimage(e.target.value);
  const handleCheckedChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  //Base64 nacin na upload
  //   const getBase64 = (file, callback) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL();
  //     reader.onload = () => {
  //         callback(reader.result);
  //     }
  //   }
  //   const handleImageUpload = (e) => {
  //         const file = e.target.files[0];
  //         getBase64(file, setimage);
  //   }

  const handleSubmit = () => {
    const newTags = checkedState
      .map((value, index) => (value ? tags[index] : null))
      .filter((tag) => tag !== null);
    const pizza = { _id, name, priceSmall, priceBig, image, tags: newTags };
    Api()
      .post("/pizzas", pizza)
      .then(() => alert("Success"))
      .catch((error) => console.log(error));
  };
  return (
    <div id="admin">
      <label>
        _id:
        <input type="text" name="id" onChange={handleIdChange} />
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

      <label htmlFor="">
        Линк до слика
        <input type="text" name="image" onChange={handleImageChange} />
      </label>
      {/* <label>
            Слика:
            <input type="file" name="file" onChange={handleImageUpload}/>
        </label> */}
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
      <button onClick={handleSubmit}>Add pizza</button>
    </div>
  );
};

export default AdminPage;
