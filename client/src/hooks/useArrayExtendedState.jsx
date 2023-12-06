import { useState } from "react";

function useArrayExtendedState() {
  const [stateArr, setStateArr] = useState([]);

  function addItemToArr(item) {
    console.log("inside addItem");
    setStateArr((prev) => {
      const newArr = [...prev];
      newArr.push(item);
      console.log("newArr: ", newArr);

      return newArr;
    });
  }

  function deleteFromStateArray(itemId) {
    console.log("inside delItem");
    const newArr = stateArr.filter((item) => item.id !== itemId);
    console.log("newArr: ", newArr);
    setStateArr(newArr);
  }
  
  function updateItem(id, newItem) {
    console.log("inside updItem");
    setStateArr((prev) => {
      const newArr = [...prev];
      let item = newArr.find((item) => item.id === id);
      item = { ...item, ...newItem };
      return newArr;
    });
  }
  return [
    stateArr,
    setStateArr,
    addItemToArr,
    deleteFromStateArray,
    updateItem,
  ];
}
export default useArrayExtendedState;
