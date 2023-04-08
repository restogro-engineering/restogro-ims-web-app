import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TextField, Drawer, Button } from "@mui/material";
import MuiTable from "../../core/mui-table";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { recipeItemHeaderConfig } from "./config";
import CustomModal from "../../core/modal";
import AddRecipeItems from "./addRecipeItems";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
const AddRecipe = ({ setCreateNewRecipe, getRecipes }) => {
  const [payload, setPayload] = useState({
    name: "",
    baseRecipe: [],
    takeOutAddOns: [],
    deliveryAddOns: [],
  });
  const [addItems, setAddItems] = useState({ isOpen: false, type: "" });
  const [recipeId, setRecipeId] = useState("");
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
  const [editRecipe, setEditRecipe] = useState({
    isEdit: false,
    quantity: "",
    type: "",
    data: {},
  });
  const quantityChangeHandler = (type) => {
    switch (type) {
      case "baseRecipe":
        const updatedBaseItems = payload.baseRecipe.map((ele) => {
          if (ele?.item?.id === editRecipe?.data?.item?.id) {
            return { ...ele, quantity: editRecipe?.quantity };
          } else {
            return ele;
          }
        });
        setPayload((prevVal) => ({
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
        const updatedtakeOutItems = payload.takeOutAddOns.map((ele) => {
          if (ele?.item?.id === editRecipe?.data?.item?.id) {
            return { ...ele, quantity: editRecipe?.quantity };
          } else {
            return ele;
          }
        });
        setPayload((prevVal) => ({
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
        const updatedDeliveryItems = payload.deliveryAddOns.map((ele) => {
          if (ele?.item?.id === editRecipe?.data?.item?.id) {
            return { ...ele, quantity: editRecipe?.quantity };
          } else {
            return ele;
          }
        });
        setPayload((prevVal) => ({
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
  const changeItem = (data) => {
    setEditRecipe({
      isEdit: true,
      quantity: data?.quantity,
      type: "baseRecipe",
      data: data,
    });
  };
  const changeTakeOutItem = (data) => {
    setEditRecipe({
      isEdit: true,
      quantity: data?.quantity,
      type: "takeOutAddOns",
      data: data,
    });
  };
  const getRecipeData = () => {
    if (recipeId) {
      invokeApi(
        HTTP_METHODS.GET,
        `${HOSTNAME}${REST_URLS.RECIPE}/${recipeId}`
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
          setPayload({
            ...res,
            baseRecipe: baseItems,
            takeOutAddOns: takeoutItems,
            deliveryAddOns: deliveryItems,
          });
        }
      });
    }
  };
  const changeDeliveryItem = (data) => {
    setEditRecipe({
      isEdit: true,
      quantity: data?.quantity,
      type: "deliveryAddOns",
      data: data,
    });
  };
  useEffect(() => {
    if (recipeId) {
      getRecipeData();
    }
  }, [recipeId]);
  useEffect(() => {
    getUnits();
  }, []);
  return (
    <div>
      <ArrowBackIosIcon
        onClick={() => {
          setCreateNewRecipe(false);
          getRecipes({ page: 1, limit: 10, sortBy: "-createdAt" });
        }}
        sx={{ cursor: "pointer" }}
      />
      Make New Recipe
      <div>
        <TextField
          label="Name"
          size="small"
          onChange={(e) => {
            setPayload((prevVal) => ({ ...prevVal, name: e.target.value }));
          }}
        />
        <div>
          <p>
            Basic Recipe{" "}
            <ControlPointIcon
              onClick={() => setAddItems({ isOpen: true, type: "baseRecipe" })}
              sx={{ cursor: "pointer" }}
            />
          </p>
          <MuiTable
            columnsList={recipeItemHeaderConfig()}
            dataList={payload?.baseRecipe || []}
            onClick={changeItem}
            pageCount={1}
          />
          <p>
            Take Out Add Ons{" "}
            <ControlPointIcon
              onClick={() =>
                setAddItems({ isOpen: true, type: "takeOutAddOns" })
              }
              sx={{ cursor: "pointer" }}
            />
          </p>
          <MuiTable
            columnsList={recipeItemHeaderConfig()}
            dataList={payload?.takeOutAddOns || []}
            onClick={changeTakeOutItem}
            pageCount={1}
          />
          <p>
            Delivery Add Ons
            <ControlPointIcon
              onClick={() =>
                setAddItems({ isOpen: true, type: "deliveryAddOns" })
              }
              sx={{ cursor: "pointer" }}
            />
          </p>
          <MuiTable
            columnsList={recipeItemHeaderConfig()}
            dataList={payload?.deliveryAddOns || []}
            onClick={changeDeliveryItem}
            pageCount={1}
          />
          <div>
            {/* <Button variant="contained" onClick={editRecipeHandler}>
          Save
        </Button> */}
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
                onChange={(e) => {
                  setEditRecipe((prevVal) => ({
                    ...prevVal,
                    quantity: parseInt(e.target.value),
                  }));
                }}
                fullWidth
              />
              <div>
                <Button
                  variant="contained"
                  onClick={() => quantityChangeHandler(editRecipe?.type)}
                  disabled={!editRecipe?.quantity}
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
              usedItems={payload}
              addItem={addItems}
              updateAddItem={setAddItems}
              setRecipeId={setRecipeId}
              getRecipeData={getRecipeData}
            />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
