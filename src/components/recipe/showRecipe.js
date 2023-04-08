import React, { useEffect, useState } from "react";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import MuiTable from "../../core/mui-table";
import { recipeItemHeaderConfig } from "./config";
import CustomModal from "../../core/modal";
import { Button, TextField, Drawer } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddRecipeItems from "./addRecipeItems";
const ShowRecipe = ({ recipeData }) => {
  const [tableData, setTableData] = useState({});
  const [editRecipe, setEditRecipe] = useState({
    isEdit: false,
    quantity: "",
    type: "",
    data: {},
  });
  const [addItems, setAddItems] = useState(false);
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
  const changeDeliveryItem = (data) => {
    setEditRecipe({
      isEdit: true,
      quantity: data?.quantity,
      type: "deliveryAddOns",
      data: data,
    });
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
      <p>
        Basic Recipe <ControlPointIcon onClick={() => setAddItems(true)} />
      </p>
      <MuiTable
        columnsList={recipeItemHeaderConfig()}
        dataList={tableData?.baseRecipe || []}
        onClick={changeItem}
        pageCount={1}
      />
      <p>Take Out Add Ons</p>
      <MuiTable
        columnsList={recipeItemHeaderConfig()}
        dataList={tableData?.takeOutAddOns || []}
        onClick={changeTakeOutItem}
        pageCount={1}
      />
      <p>Delivery Add Ons</p>
      <MuiTable
        columnsList={recipeItemHeaderConfig()}
        dataList={tableData?.deliveryAddOns || []}
        onClick={changeDeliveryItem}
        pageCount={1}
      />
      <div>
        <Button variant="contained" onClick={editRecipeHandler}>
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
      <Drawer anchor="right" open={addItems} onClose={() => setAddItems(false)}>
        <AddRecipeItems usedItems={tableData} />
      </Drawer>
    </div>
  );
};

export default ShowRecipe;
