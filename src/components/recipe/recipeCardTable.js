import React, { useState } from "react";
import "./index.scss";
import { Pagination, Stack, Grid } from "@mui/material";

const RecipeCardTable = ({ data, pageChange, recipeDetails }) => {
  const { limit, totalResults } = data;
  const totalPages = Math.ceil(totalResults / limit);
  const [page, setPage] = useState(1);
  return (
    <div>
      <div>
        <Grid container md={12} spacing={3}>
          {data?.results?.map((ele) => {
            return (
              <Grid item md={3} xs={12} className="recipe-card-container">
                <div
                  key={ele.id}
                  className="recipe-card"
                  onClick={() => {
                    recipeDetails({
                      isShow: true,
                      data: ele,
                    });
                  }}
                >
                  <p className="title">{ele?.name}</p>
                  <div>
                    <p>Igredients Required</p>
                    {ele?.baseRecipe?.map((i, index) => {
                      if (index < 4) {
                        return (
                          <ul>
                            <li>{i?.item?.name}</li>
                          </ul>
                        );
                      }
                    })}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
      {totalPages > 1 && (
        <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => {
              setPage(page);
              if (pageChange) {
                pageChange(page);
              }
            }}
          />
        </Stack>
      )}
    </div>
  );
};

export default RecipeCardTable;
