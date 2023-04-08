import React, { useState, useEffect } from "react";
import "./index.scss";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import RecipeCardTable from "./recipeCardTable";
import ShowRecipe from "./showRecipe";

const Recipe = () => {
  const [tableData, setTableData] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "-createdAt",
  });
  const [showFullRecipe, setShowFullRecipe] = useState({
    isShow: false,
    data: {},
  });
  const getRecipeData = (filters) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.RECIPE}`,
      null,
      filters
    ).then((res) => {
      if (!res.message) {
        const result = res.results.map((ele) => ({
          ...ele,
        }));
        setTableData({ ...res, results: result });
      }
    });
  };

  const handlePageChange = (value) => {
    setFilters({ ...filters, page: value });
  };

  useEffect(() => {
    getRecipeData(filters);
  }, [filters]);
  return (
    <div className="recipe-container">
      {!showFullRecipe?.isShow && (
        <RecipeCardTable
          data={tableData}
          pageChange={handlePageChange}
          recipeDetails={setShowFullRecipe}
        />
      )}

      {showFullRecipe?.isShow && (
        <ShowRecipe recipeData={showFullRecipe?.data} />
      )}
    </div>
  );
};

export default Recipe;
