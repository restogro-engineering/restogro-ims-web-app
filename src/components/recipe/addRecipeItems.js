import React, { useState, useEffect } from "react";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import "./index.scss";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
const AddRecipeItems = ({
  usedItems,
  addItem,
  updateAddItem,
  getRecipeData,
  setRecipeId,
}) => {
  const [allItemsList, setAllItemsList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [payload, setPayload] = useState({
    name: usedItems?.name,
    baseRecipe: usedItems?.baseRecipe,
    takeOutAddOns: usedItems?.takeOutAddOns,
    deliveryAddOns: usedItems?.deliveryAddOns,
  });
  const getAllItems = () => {
    invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.GET_ALL_ITEMS}`)
      .then((res) => {
        setAllItemsList(res);
      })
      .catch((err) => console.log(err));
  };
  const filterItemList = (type) => {
    switch (type) {
      case "baseRecipe":
        const items = allItemsList.filter((ele) => {
          return !usedItems?.baseRecipe?.some(
            (item1) => item1?.item?.id === ele?.id
          );
        });
        setItemList(items);
        break;
      case "takeOutAddOns":
        const takeOutItems = allItemsList.filter((ele) => {
          return !usedItems?.takeOutAddOns?.some(
            (item1) => item1?.item?.id === ele?.id
          );
        });
        setItemList(takeOutItems);
        break;
      case "deliveryAddOns":
        const deliveryItems = allItemsList.filter((ele) => {
          return !usedItems?.deliveryAddOns?.some(
            (item1) => item1?.item?.id === ele?.id
          );
        });
        setItemList(deliveryItems);
        break;
      default:
        break;
    }
  };
  const handleCheckboxChange = (id, isChecked) => {
    const selectedItem = itemList.find((item) => item.id === id);
    if (isChecked) {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { item: selectedItem, quantity: 1 },
      ]);
    } else {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.item.id !== id)
      );
    }
  };

  const handleQuantityChange = (id, value) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item?.item?.id === id) {
          return { ...item, quantity: parseInt(value) };
        }
        return item;
      })
    );
  };

  const changeItemHandler = (type) => {
    const updatedItems = cartItems.map((ele) => {
      return { ...ele, item: parseInt(ele?.item?.id) };
    });
    const baseItems = usedItems?.baseRecipe?.map((ele) => ({
      ...ele,
      item: parseInt(ele?.item?.id),
    }));
    const takeOutItems = usedItems?.takeOutAddOns?.map((ele) => ({
      ...ele,
      item: parseInt(ele?.item?.id),
    }));
    const deliveryItems = usedItems?.deliveryAddOns?.map((ele) => ({
      ...ele,
      item: parseInt(ele?.item?.id),
    }));
    setPayload((prevVal) => ({
      ...prevVal,
      baseRecipe: baseItems,
      takeOutAddOns: takeOutItems,
      deliveryAddOns: deliveryItems,
    }));
    switch (type) {
      case "baseRecipe":
        setPayload((prevVal) => ({
          ...prevVal,
          baseRecipe: [...baseItems, ...updatedItems],
        }));
        break;
      case "takeOutAddOns":
        setPayload((prevVal) => ({
          ...prevVal,
          takeOutAddOns: [...takeOutItems, ...updatedItems],
        }));
        break;
      case "deliveryAddOns":
        setPayload((prevVal) => ({
          ...prevVal,
          deliveryAddOns: [...deliveryItems, ...updatedItems],
        }));

        break;
      default:
        break;
    }
  };
  const addItemHandler = () => {
    if (cartItems?.length > 0) {
      if (usedItems?.id) {
        invokeApi(
          HTTP_METHODS.PUT,
          `${HOSTNAME}${REST_URLS.RECIPE}/${usedItems?.id}`,
          payload
        ).then((res) => {
          if (res?.message) {
            toast.error(res?.message, { autoClose: 2000 });
          } else {
            toast.success("Items Added Successfully", { autoClose: 2000 });
            updateAddItem({
              isOpen: false,
              type: "",
            });
            getRecipeData();
          }
        });
      } else {
        invokeApi(
          HTTP_METHODS.POST,
          `${HOSTNAME}${REST_URLS.RECIPE}`,
          payload
        ).then((res) => {
          if (res?.message) {
            toast.error(res?.message, { autoClose: 2000 });
          } else {
            toast.success("Items Added Successfully", { autoClose: 2000 });
            updateAddItem({
              isOpen: false,
              type: "",
            });
            setRecipeId(res?.id);
            getRecipeData();
          }
        });
      }
    }
  };
  useEffect(() => {
    if (cartItems.length > 0) {
      changeItemHandler(addItem?.type);
    }
  }, [cartItems]);
  useEffect(() => {
    getAllItems();
  }, []);
  useEffect(() => {
    if (allItemsList.length) {
      filterItemList(addItem?.type);
    }
  }, [allItemsList]);
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Add Item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.supplyPrice}</TableCell>
              <TableCell>{item?.customUnit?.name}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  size="small"
                  defaultValue={1}
                  inputProps={{ min: 1 }}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange(item.id, e.target.checked)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        onClick={addItemHandler}
        sx={{ float: "right", mt: 2, mr: 1 }}
      >
        Save
      </Button>
    </div>
  );
};

export default AddRecipeItems;
