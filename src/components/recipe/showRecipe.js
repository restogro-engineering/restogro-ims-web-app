import React, { useEffect, useState } from "react";
import "./index.scss";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { toast } from "react-toastify";
import MuiTable from "../../core/mui-table";
import { recipeItemHeaderConfig } from "./config";
import CustomModal from "../../core/modal";
import { Button, TextField, Drawer, Grid } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddRecipeItems from "./addRecipeItems";
const ShowRecipe = ({ recipeData, setShowFullRecipe, getRecipes }) => {
  const [tableData, setTableData] = useState({});
  const [editRecipe, setEditRecipe] = useState({
    isEdit: false,
    quantity: "",
    type: "",
    data: {},
  });
  const [addItems, setAddItems] = useState({ isOpen: false, type: "" });
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
          const takeoutItems = res.takeOutAddOns.map((i) => {
            const unit = unitData.find(
              (ele) => parseInt(ele?.id) === parseInt(i?.item?.customUnit)
            );
            return { ...i, item: { ...i?.item, unit: unit?.name } };
          });
          const deliveryItems = res.deliveryAddOns.map((i) => {
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
  const changeItem = (data, action) => {
    if (action === "edit") {
      setEditRecipe({
        isEdit: true,
        quantity: data?.quantity,
        type: "baseRecipe",
        data: data,
      });
    }
    if (action === "delete") {
      const filteredItems = tableData.baseRecipe.filter(
        (i) => i?.item?.id !== data?.item?.id
      );
      setTableData((prevVal) => ({ ...prevVal, baseRecipe: filteredItems }));
    }
  };
  const changeTakeOutItem = (data, action) => {
    if (action === "edit") {
      setEditRecipe({
        isEdit: true,
        quantity: data?.quantity,
        type: "takeOutAddOns",
        data: data,
      });
    }
    if (action === "delete") {
      const filteredItems = tableData.takeOutAddOns.filter(
        (i) => i?.item?.id !== data?.item?.id
      );
      setTableData((prevVal) => ({ ...prevVal, takeOutAddOns: filteredItems }));
    }
  };
  const changeDeliveryItem = (data, action) => {
    if (action === "edit") {
      setEditRecipe({
        isEdit: true,
        quantity: data?.quantity,
        type: "deliveryAddOns",
        data: data,
      });
    }
    if (action === "delete") {
      const filteredItems = tableData.deliveryAddOns.filter(
        (i) => i?.item?.id !== data?.item?.id
      );
      setTableData((prevVal) => ({
        ...prevVal,
        deliveryAddOns: filteredItems,
      }));
    }
  };
  const editRecipeHandler = () => {
    const baseRecipe = tableData?.baseRecipe.map((ele) => ({
      ...ele,
      item: parseInt(ele?.item?.id),
    }));
    const takeOutAddOns = tableData?.takeOutAddOns.map((ele) => ({
      ...ele,
      item: parseInt(ele?.item?.id),
    }));
    const deliveryAddOns = tableData?.deliveryAddOns.map((ele) => ({
      ...ele,
      item: parseInt(ele?.item?.id),
    }));
    const payload = {
      name: tableData?.name,
      baseRecipe,
      takeOutAddOns,
      deliveryAddOns,
    };
    if (tableData?.id) {
      invokeApi(
        HTTP_METHODS.PUT,
        `${HOSTNAME}${REST_URLS.RECIPE}/${tableData.id}`,
        payload
      ).then((res) => {
        if (res.message) {
          toast.error(res.message, { autoClose: 2000 });
        } else {
          toast.success("Recipe Updated Successfully", { autoClose: 2000 });
          getRecipeData();
        }
      });
    }
  };
  const quantityChangeHandler = (type) => {
    switch (type) {
      case "baseRecipe":
        const updatedBaseItems = tableData.baseRecipe.map((ele) => {
          if (ele?.item?.id === editRecipe?.data?.item?.id) {
            return { ...ele, quantity: editRecipe?.quantity };
          } else {
            return ele;
          }
        });
        setTableData((prevVal) => ({
          ...prevVal,
          baseRecipe: updatedBaseItems,
        }));
        setEditRecipe({
          isEdit: false,
          quantity: "",
          type: "",
          data: {},
        });
        break;
      case "takeOutAddOns":
        const updatedtakeOutItems = tableData.takeOutAddOns.map((ele) => {
          if (ele?.item?.id === editRecipe?.data?.item?.id) {
            return { ...ele, quantity: editRecipe?.quantity };
          } else {
            return ele;
          }
        });
        setTableData((prevVal) => ({
          ...prevVal,
          takeOutAddOns: updatedtakeOutItems,
        }));
        setEditRecipe({
          isEdit: false,
          quantity: "",
          type: "",
          data: {},
        });
        break;
      case "deliveryAddOns":
        const updatedDeliveryItems = tableData.deliveryAddOns.map((ele) => {
          if (ele?.item?.id === editRecipe?.data?.item?.id) {
            return { ...ele, quantity: editRecipe?.quantity };
          } else {
            return ele;
          }
        });
        setTableData((prevVal) => ({
          ...prevVal,
          deliveryAddOns: updatedDeliveryItems,
        }));
        setEditRecipe({
          isEdit: false,
          quantity: "",
          type: "",
          data: {},
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (unitData) {
      getRecipeData();
    }
  }, [unitData]);
  useEffect(() => {
    getUnits();
  }, []);

  return (
    <div>
      <div className="recipe-title-con m-b">
        <ArrowBackIosIcon
          onClick={() => {
            setShowFullRecipe(false);
            getRecipes({ page: 1, limit: 10, sortBy: "-createdAt" });
          }}
          sx={{ cursor: "pointer" }}
        />
        <h2>{recipeData?.name}</h2>
      </div>

      <div className="recipe-title-con">
        <p>Basic Recipe</p>
        <ControlPointIcon
          onClick={() => setAddItems({ isOpen: true, type: "baseRecipe" })}
          sx={{ cursor: "pointer", ml: 2 }}
        />
      </div>

      <MuiTable
        columnsList={recipeItemHeaderConfig()}
        dataList={tableData?.baseRecipe || []}
        onClick={changeItem}
        pageCount={1}
      />
      <Grid
        container
        md={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item md={5.8} sm={12}>
          <div className="recipe-title-con">
            <p>Take Out Add Ons</p>
            <ControlPointIcon
              onClick={() =>
                setAddItems({ isOpen: true, type: "takeOutAddOns" })
              }
              sx={{ cursor: "pointer", ml: 2 }}
            />
          </div>

          <MuiTable
            columnsList={recipeItemHeaderConfig()}
            dataList={tableData?.takeOutAddOns || []}
            onClick={changeTakeOutItem}
            pageCount={1}
          />
        </Grid>
        <Grid md={5.8} item sm={12}>
          <div className="recipe-title-con">
            <p>Delivery Add Ons</p>
            <ControlPointIcon
              onClick={() =>
                setAddItems({ isOpen: true, type: "deliveryAddOns" })
              }
              sx={{ cursor: "pointer", ml: 2 }}
            />
          </div>

          <MuiTable
            columnsList={recipeItemHeaderConfig()}
            dataList={tableData?.deliveryAddOns || []}
            onClick={changeDeliveryItem}
            pageCount={1}
          />
        </Grid>
      </Grid>

      <div>
        <Button
          variant="contained"
          onClick={editRecipeHandler}
          sx={{ float: "right" }}
        >
          Save
        </Button>
      </div>
      {editRecipe?.isEdit && (
        <CustomModal
          title="Change Quantity"
          onClose={() => {
            setEditRecipe({
              isEdit: false,
              quantity: "",
              baseRecipe: "",
              data: {},
            });
          }}
        >
          <TextField
            label="Quantity"
            value={editRecipe?.quantity}
            type="number"
            size="small"
            onChange={(e) => {
              setEditRecipe((prevVal) => ({
                ...prevVal,
                quantity: parseInt(e.target.value),
              }));
            }}
            fullWidth
          />
          <div className="btn-con">
            <Button
              variant="contained"
              size="small"
              color="error"
              fullWidth
              onClick={() =>
                setEditRecipe({
                  isEdit: false,
                  quantity: "",
                  baseRecipe: "",
                  data: {},
                })
              }
              sx={{ mr: "5px", mt: 3 }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => quantityChangeHandler(editRecipe?.type)}
              disabled={!editRecipe?.quantity}
              sx={{ mt: 3 }}
            >
              Save
            </Button>
          </div>
        </CustomModal>
      )}
      <Drawer
        anchor="right"
        open={addItems?.isOpen}
        onClose={() => setAddItems({ isOpen: false, type: "" })}
      >
        <AddRecipeItems
          usedItems={tableData}
          addItem={addItems}
          updateAddItem={setAddItems}
          getRecipeData={getRecipeData}
        />
      </Drawer>
    </div>
  );
};

export default ShowRecipe;
