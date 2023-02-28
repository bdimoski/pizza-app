import React, { useContext, useState } from "react";
import Api from "../../Api";
import { TagContext } from "../../context/tagContext";

const TagManagerPage = () => {
  const { tags, setTags } = useContext(TagContext);
  const [tag, setTag] = useState("");
  const handleTagChange = (e) => setTag(e.target.value);
  const handleKeyDown = (e) => (e.key === "Enter" ? submitTag() : null);
  const submitTag = () => {
    Api()
      .post("/tags", { tag })
      .then((response) => {
        //console.log(response);
        setTag("");
        setTags([...tags, { tag }]);
      })
      .catch(console.error);
  };
  return (
    <div id="tags">
      {tags.map((tagItem) => (
        <li key={tagItem._id}>{tagItem.tag}</li>
      ))}
      <input type="text" onChange={handleTagChange} onKeyDown={handleKeyDown} />
      <button onClick={submitTag}>Add tag</button>
    </div>
  );
};

export default TagManagerPage;
