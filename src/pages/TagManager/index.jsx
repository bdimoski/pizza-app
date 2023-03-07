import React, { useContext, useState } from "react";
import Api from "../../Api";
import { TagContext } from "../../context/tagContext";

const TagManagerPage = () => {
  const { tags, setTags } = useContext(TagContext);
  const [tag, setTag] = useState("");
  const handleTagChange = (e) => setTag(e.target.value);
  const handleKeyDown = (e) => (e.key === "Enter" ? addTag() : null);
  const addTag = () => {
    Api()
      .post("/tags", { tag })
      .then((response) => {
        setTag("");
        setTags([...tags, { tag }]);
      })
      .catch(console.error);
  };
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((tag, index) => index !== indexToRemove));
  };
  return (
    <div className="tags flex flex-col flex-wrap items-center bg-gray-300 rounded-lg m-3 p-2">
      <h3 className="text-lg font-bold text-white text-center bg-gray-600 rounded-md px-4 py-2 mb-4 w-[50%]">
        Tag Manager - Add and Remove Tags
      </h3>
      {/* {console.log(tags)} */}
      {tags.map((tagItem, index) => (
        <div
          key={tagItem._id}
          className="relative inline-flex items-center mx-2 my-1 rounded-full hover:shadow-xl transition duration-300 ease-in-out hover:bg-teal-500 bg-gray-200"
        >
          <span className="px-2 py-1 font-semibold">{tagItem.tag}</span>
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="mx-2 text-gray-800 hover:bg-gray-500 hover:text-black rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center w-6 h-6 text-sm"
          >
            X
          </button>
        </div>
      ))}
      <div className="inline-flex items-center gap-2 my-6">
        <input
          type="text"
          onChange={handleTagChange}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-3 rounded-lg text-gray-800 bg-white border border-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:border-teal-500"
          placeholder="Tag name..."
        />
        <button
          onClick={addTag}
          className="bg-teal-500 text-white rounded-md px-16 py-3 block mx-auto"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TagManagerPage;
