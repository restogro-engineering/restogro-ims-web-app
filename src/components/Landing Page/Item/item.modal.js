import CustomModal from "../../../core/modal";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { createOrUpdateItem } from "./helper";

import Select from "react-select";
import {
  disableSaveButton,
  getCategoriesList,
  getUnitsList,
  setModalData,
  setModalDataOnChange,
} from "./modal-helper";

export const ItemModal = ({
  title,
  closeModal,
  data,
  showModal,
  customModalContentClass,
  onSuccess,
}) => {
  const [itemData, setItemData] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [unitList, setUnitsList] = useState([]);

  // When we are updating an item we get data from props and we set it
  useEffect(() => {
    setModalData(data, setItemData);
  }, [data]);

  // Clearing data when modal gets closed
  useEffect(() => {
    if (!showModal) {
      setItemData({});
    }
  }, [showModal]);

  useEffect(() => {
    getCategoriesList(setCategoryList); // Setting categories list data
    getUnitsList(setUnitsList); // Setting units list data
  }, []);

  // Function for settinng the data when user changes the data
  const settItemDateOnChange = (e, type, details) => {
    setModalDataOnChange(e, type, setItemData, details);
  };

  return (
    <>
      {showModal && (
        <CustomModal
          title={title}
          contentClassName={{
            headerBackgroundColor: "#008952",
            customClass: `${
              customModalContentClass ? customModalContentClass : ""
            }`,
          }}
          onClose={closeModal}
        >
          <div className="modal-input-container">
            <div>Code</div>
            <TextField
              size="small"
              name="code"
              fullWidth
              onChange={settItemDateOnChange}
              value={itemData.code}
              placeholder="Code"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>
          <div className="modal-input-container">
            <div>Name</div>
            <TextField
              size="small"
              name="name"
              fullWidth
              onChange={settItemDateOnChange}
              value={itemData.name}
              placeholder="name"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>Category</div>
            <Select
              placeholder="Select Category"
              options={categoryList}
              name="category"
              onChange={(e, details) =>
                settItemDateOnChange(e, "select", details)
              }
              value={
                ![null, undefined].includes(itemData.category)
                  ? categoryList.find((ele) => ele.value === itemData.category)
                  : null
              }
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 2,
                }),
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>Sub Category</div>
            <Select
              placeholder="Select Sub Category"
              options={categoryList}
              onChange={(e, details) =>
                settItemDateOnChange(e, "select", details)
              }
              name="subCategory"
              value={
                ![null, undefined].includes(itemData.subCategory)
                  ? categoryList.find(
                      (ele) => ele.value === itemData.subCategory
                    )
                  : null
              }
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 2,
                }),
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>Current Stock</div>

            <TextField
              size="small"
              name="curStock"
              type="number"
              fullWidth
              onChange={settItemDateOnChange}
              value={itemData.curStock}
              placeholder="Current Stock"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>Minimum Stock</div>
            <TextField
              size="small"
              name="minStock"
              type="number"
              fullWidth
              onChange={settItemDateOnChange}
              value={itemData.minStock}
              placeholder="Minimum Stock"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>Base Unit</div>
            <TextField
              size="small"
              name="baseUnit"
              fullWidth
              onChange={settItemDateOnChange}
              value={itemData.baseUnit}
              placeholder="Base Unit"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>Custom Unit</div>
            <Select
              placeholder="Select Custom Unit"
              options={unitList}
              onChange={(e, details) =>
                settItemDateOnChange(e, "select", details)
              }
              name="customUnit"
              value={
                ![null, undefined].includes(itemData.customUnit)
                  ? unitList.find((ele) => ele.value === itemData.customUnit)
                  : null
              }
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 2,
                }),
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>Supply Price</div>
            <TextField
              size="small"
              name="supplyPrice"
              type="number"
              fullWidth
              onChange={settItemDateOnChange}
              value={itemData.supplyPrice}
              placeholder="Supply Price"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>Price Per Base Unit</div>
            <TextField
              size="small"
              name="pricePerBaseUnit"
              type="number"
              fullWidth
              onChange={settItemDateOnChange}
              value={itemData.pricePerBaseUnit}
              placeholder="Price Per Base Unit"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <Stack className="flexEnd" direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={disableSaveButton(itemData)}
              onClick={() => {
                createOrUpdateItem(itemData, onSuccess);
              }}
            >
              {itemData?.id ? "Update" : "Create"}
            </Button>
          </Stack>
        </CustomModal>
      )}
    </>
  );
};
