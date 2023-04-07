import React, { useState, useEffect } from "react";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";

const Recipe = () => {
  const [tableData, setTableData] = useState({});
  const getRecipes = () => {};
  return <div>Recipe</div>;
};

export default Recipe;
