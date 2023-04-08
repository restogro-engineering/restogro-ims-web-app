import React, { useEffect, useState } from "react";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import MuiTable from "../../core/mui-table";
import { recipeItemHeaderConfig } from "./config";

const ShowRecipe = ({ recipeData }) => {
  const [tableData, setTableData] = useState({});
  const [editedData, setEditedData] = useState(recipeData);
  const [unitData, setUnitData] = useState([]);
  const getUnits = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.GET_ALL_UNITS}`)
      .then((res) => {
        if (!res.message) {
          setUnitData(res);
        }
      })
      .catch((err) => console.log(err));
  };
  const getRecipeData = () => {
    if (recipeData?.id) {
      invokeApi(
        HTTP_METHODS.GET,
        `${HOSTNAME}${REST_URLS.RECIPE}/${recipeData?.id}`
      ).then((res) => {
        if (res?.message) {
          toast.error(res.message, { autoClose: 2000 });
        } else {
          const baseItems = res.baseRecipe.map((i) => {
            const unit = unitData.find(
              (ele) => parseInt(ele?.id) === parseInt(i?.item?.customUnit)
            );
            return { ...i, item: { ...i?.item, unit: unit?.name } };
          });
          const takeoutItems = res.baseRecipe.map((i) => {
            const unit = unitData.find(
              (ele) => parseInt(ele?.id) === parseInt(i?.item?.customUnit)
            );
            return { ...i, item: { ...i?.item, unit: unit?.name } };
          });
          const deliveryItems = res.baseRecipe.map((i) => {
            const unit = unitData.find(
              (ele) => parseInt(ele?.id) === parseInt(i?.item?.customUnit)
            );
            return { ...i, item: { ...i?.item, unit: unit?.name } };
          });
          setTableData({
            ...res,
            baseRecipe: baseItems,
            takeOutAddOns: takeoutItems,
            deliveryAddOns: deliveryItems,
          });
        }
      });
    }
  };
  const changeItem = (data) => {
    console.log(data);
  };
  console.log(unitData);
  useEffect(() => {
    getRecipeData();
    getUnits();
  }, []);

  return (
    <div>
      ShowRecipe
      <MuiTable
        columnsList={recipeItemHeaderConfig()}
        dataList={tableData?.baseRecipe || []}
        onClick={changeItem}
        pageCount={1}
      />
    </div>
  );
};

export default ShowRecipe;
