import React, { useState, useEffect } from "react";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";

const AddRecipeItems = ({ usedItems }) => {
  const [allItemsList, setAllItemsList] = useState([]);
  const getAllItems = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.GET_ALL_ITEMS}`)
      .then((res) => {
        setAllItemsList(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllItems();
  }, []);
  return <div>AddRecipeItems</div>;
};

export default AddRecipeItems;
