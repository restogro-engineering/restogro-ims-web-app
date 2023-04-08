import CustomModal from "../../core/modal";
import { Button, Grid } from "@mui/material";
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
            // headerBackgroundColor: "#008952",
            customClass: `${
              customModalContentClass ? customModalContentClass : ""
            }`,
          }}
          onClose={closeModal}
        >
          <Grid md={12} container spacing={2}>
            <Grid md={6} item>
              <TextField
                label="Code"
                size="small"
                name="code"
                fullWidth
                value={itemData.code}
                onChange={settItemDateOnChange}
                placeholder="Code"
              />
            </Grid>
            <Grid md={6} item>
              <TextField
                label="Name"
                size="small"
                name="name"
                fullWidth
                value={itemData.name}
                onChange={settItemDateOnChange}
                placeholder="Name"
              />
            </Grid>

            <Grid md={6} item>
              <p className="select-label">Category</p>

              <Select
                placeholder="Select Category"
                options={categoryList}
                name="category"
                onChange={(e, details) =>
                  settItemDateOnChange(e, "select", details)
                }
                value={
                  ![null, undefined].includes(itemData.category)
                    ? categoryList.find(
                        (ele) => ele.value === itemData.category
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
            </Grid>

            <Grid md={6} item>
              <p className="select-label">Sub Category</p>

              <Select
                options={categoryList}
                onChange={(e, details) =>
                  settItemDateOnChange(e, "select", details)
                }
                placeholder="Select Sub Category"
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
            </Grid>

            <Grid md={6} item>
              <TextField
                label="Minimum Stock"
                size="small"
                name="minStock"
                fullWidth
                value={itemData.minStock}
                onChange={settItemDateOnChange}
                placeholder="Minimum Stock"
                type="number"
              />
            </Grid>

            <Grid md={6} item>
              <TextField
                label="Base Unit"
                size="small"
                name="baseUnit"
                fullWidth
                value={itemData.baseUnit}
                onChange={settItemDateOnChange}
                placeholder="Base Unit"
              />
            </Grid>

          
            <Grid md={6} item>
              <TextField
                label="Supply Price"
                size="small"
                name="supplyPrice"
                fullWidth
                value={itemData.supplyPrice}
                onChange={settItemDateOnChange}
                placeholder="Supply Price"
                type="number"
              />
            </Grid>

            <Grid md={6} item>
              <TextField
                label="Price Per Base Unit"
                size="small"
                name="pricePerBaseUnit"
                fullWidth
                value={itemData.pricePerBaseUnit}
                onChange={settItemDateOnChange}
                placeholder="Price Per Base Unit"
                type="number"
              />
            </Grid>
            <Grid md={6} item>
              <p className="select-label">Custom Unit</p>

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
            </Grid>
          </Grid>

          <Grid
            md={12}
            item
            sx={{ display: "flex", justifyContent: "center", mt: 3 }}
            spacing={2}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 3 }}
              fullWidth
              onClick={closeModal}
            >
              Cancel
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              disabled={disableSaveButton(itemData)}
              onClick={() => {
                createOrUpdateItem(itemData, onSuccess);
              }}
            >
              {itemData?.id ? "Update" : "Create"}
            </Button>
          </Grid>
        </CustomModal>
      )}
    </>
  );
};
