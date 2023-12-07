import { useState } from "react";

function useArrayExtendedState() {
  const [arr, setArr] = useState([]);

  function addItemToArr(item) {
    setArr((prev) => {
      const newArr = [...prev];
      newArr.push(item);

      return newArr;
    });
  }

  function deleteFromArray(itemId) {
    const newArr = arr.filter((item) => item.id !== itemId);
    setArr(newArr);
  }
  
  function updateItem(id, newItem) {
    setArr((prev) => {
      const newArr = [...prev];
      let item = newArr.find((item) => item.id === id);
      item = { ...item, ...newItem };
      return newArr;
    });
  }
  return [
    arr,
    setArr,
    addItemToArr,
    deleteFromArray,
    updateItem,
  ];
}
export default useArrayExtendedState;
