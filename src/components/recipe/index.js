import React, { useState, useEffect } from "react";
import "./index.scss";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import RecipeCardTable from "./recipeCardTable";
import ShowRecipe from "./showRecipe";
import { Button } from "@mui/material";
import AddRecipe from "./addRecipe";

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
  const [createNewRecipe, setCreateNewRecipe] = useState(false);
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
      {!createNewRecipe && !showFullRecipe?.isShow && (
        <div className="r-header">
          <h2 className="si-hide-mobile">List Of Recipes</h2>
          <Button
            variant="contained"
            onClick={() => {
              setCreateNewRecipe(true);
              setShowFullRecipe(false);
            }}
            className="si-hide-mobile"
            sx={{ float: "right", mb: 0.5, mr: 2.5 }}
          >
            Add New Recipe
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setCreateNewRecipe(true);
              setShowFullRecipe(false);
            }}
            size="small"
            className="si-hide-web"
            sx={{ margin: "auto" }}
          >
            Add New Recipe
          </Button>
        </div>
      )}

      {!showFullRecipe?.isShow && !createNewRecipe && (
        <RecipeCardTable
          data={tableData}
          pageChange={handlePageChange}
          recipeDetails={setShowFullRecipe}
        />
      )}

      {showFullRecipe?.isShow && !createNewRecipe && (
        <ShowRecipe
          recipeData={showFullRecipe?.data}
          setShowFullRecipe={setShowFullRecipe}
          getRecipes={getRecipeData}
        />
      )}
      {createNewRecipe && !showFullRecipe && (
        <AddRecipe
          setCreateNewRecipe={setCreateNewRecipe}
          getRecipes={getRecipeData}
        />
      )}
    </div>
  );
};

export default Recipe;
