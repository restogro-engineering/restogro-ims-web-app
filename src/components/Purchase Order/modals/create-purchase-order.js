import { useEffect, useState } from "react";
import CustomModal from "../../../core/modal";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { createPurchaseOrder, getVendorList } from "./apis";
import { actionHandler, setCreateModalDetailsOnChange } from "./helper";
import { formatDate } from "../../../utils";
import { DATE_FORMATS } from "../../../utils/constants";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createPurchaseOrderItemsConfig } from "./config";
import { disableSaveButton } from "./helper-2";
import Checkbox from "@mui/material/Checkbox";
import MuiTable from "../../../core/mui-table";
import useScreenWidth from "../../../Hooks/useScreenWidth";
import { getStoreSelectList } from "../../../utils/store";

export const CreatePurchaseOrderModal = ({
  showModal,
  closeModal,
  onSuccess,
}) => {
  const [modalDetails, setModalDetails] = useState({});
  const [vendorList, setVendorList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [categoryList, setCategoriesList] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);
  const [itemsPage, setItemsPage] = useState(1);
  const [refresh, setRefresh] = useState("");
  const screenWidth = useScreenWidth();

  const clearData = () => {
    setModalDetails({});
    setItemsPage(1);
    setItemList([]);
    setCategoriesList([]);
  };

  useEffect(() => {
    if (!showModal) {
      clearData();
      return;
    }
    (async () => {
      const finalStoreList = await getStoreSelectList();
      setStoreOptions(finalStoreList);
    })();
  }, [showModal]);

  useEffect(() => {
    getVendorList(setVendorList);
  }, []);

  const setModalDetailsOnChange = (e, type, details) => {
    setCreateModalDetailsOnChange(
      e,
      type,
      setModalDetails,
      details,
      setItemList,
      setCategoriesList,
      modalDetails,
      itemList,
      setItemsPage,
      itemsPage
    );
  };

  return (
    <>
      {showModal && (
        <CustomModal
          title="Create Purchase Order"
          contentClassName={{
            // headerBackgroundColor: "#008952",
            customClass: "",
          }}
          onClose={closeModal}
        >
          <Grid md={12} container spacing={2}>
            <Grid
              xs={screenWidth > 900 ? 4 : screenWidth < 500 ? 12 : 6}
              md={4}
              item
            >
              <p className="select-label">
                Vendor <span className="warning">*</span>
              </p>
              <Select
                placeholder="Select Vendor"
                options={vendorList}
                name="vendor"
                onChange={(e, details) => {
                  setModalDetailsOnChange(e, "select", details);
                }}
                value={
                  ![null, undefined].includes(modalDetails.vendor)
                    ? vendorList.find(
                        (ele) => ele.value === modalDetails.vendor
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
            <Grid
              item
              xs={screenWidth > 900 ? 4 : screenWidth < 500 ? 12 : 6}
              md={4}
            >
              <p className="select-label">
                Categories <span className="warning">*</span>
              </p>
              <Select
                placeholder="Select Categories"
                options={categoryList}
                isMulti={true}
                name="categories"
                onChange={(e, details) => {
                  setModalDetailsOnChange(e, "multiSelect", details);
                }}
                value={modalDetails.categories || []}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 2,
                  }),
                }}
              />
            </Grid>
            <Grid
              xs={screenWidth > 900 ? 4 : screenWidth < 500 ? 12 : 6}
              md={4}
              item
            >
              <p className="select-label">
                Items <span className="warning">*</span>
              </p>
              {refresh !== "items list" && (
                <Select
                  placeholder="Select items"
                  options={itemList}
                  isMulti={true}
                  name="items"
                  onChange={(e, details) => {
                    setModalDetailsOnChange(e, "multiSelect", details);
                  }}
                  value={modalDetails.items || []}
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 2,
                    }),
                  }}
                />
              )}
            </Grid>
            <Grid
              xs={screenWidth > 900 ? 4 : screenWidth < 500 ? 12 : 6}
              md={4}
              item
            >
              <TextField
                label="Date"
                size="small"
                disabled={true}
                className="select-level-margin"
                fullWidth
                value={formatDate(
                  new Date().toISOString(),
                  DATE_FORMATS["DD-MM-YYYY"]
                )}
                placeholder="Date"
              />
            </Grid>
            <Grid
              xs={screenWidth > 900 ? 4 : screenWidth < 500 ? 12 : 6}
              md={4}
              item
            >
              <TextField
                label="PO Number *"
                size="small"
                name="poNumber"
                fullWidth
                value={modalDetails.poNumber}
                onChange={setModalDetailsOnChange}
              />
            </Grid>

            <Grid
              xs={screenWidth > 900 ? 4 : screenWidth < 500 ? 12 : 6}
              md={4}
              item
            >
              <TextField
                label="PR Number *"
                size="small"
                name="prNumber"
                fullWidth
                value={modalDetails.prNumber}
                onChange={setModalDetailsOnChange}
              />
            </Grid>
            <Grid
              xs={screenWidth > 900 ? 4 : screenWidth < 500 ? 12 : 6}
              md={4}
              item
            >
              <p className="select-label">
                Store <span className="warning">*</span>
              </p>
              <Select
                placeholder="Select Store"
                options={storeOptions}
                name="store"
                onChange={(e, details) => {
                  setModalDetailsOnChange(e, "select", details);
                }}
                value={
                  ![null, undefined].includes(modalDetails.store)
                    ? storeOptions.find(
                        (ele) => ele.value === modalDetails.store
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

            <Grid
              xs={screenWidth > 900 ? 4 : screenWidth < 500 ? 12 : 6}
              md={4}
              item
            >
              <FormControlLabel
                value="end"
                checked={!!modalDetails.isDeliveryAddressDeploymentAddress}
                control={
                  <Checkbox
                    color="primary"
                    onChange={() => {
                      setModalDetailsOnChange(
                        {
                          name: "isDeliveryAddressDeploymentAddress",
                          value:
                            !modalDetails.isDeliveryAddressDeploymentAddress,
                        },
                        "checkbox"
                      );
                    }}
                  />
                }
                label="Is Delivery Address Deployment Address?"
                labelPlacement="start"
              />
            </Grid>
          </Grid>

          {modalDetails?.categories?.length && (
            <Grid md={12} item>
              <div className="create-modal-table">
                <MuiTable
                  columnsList={createPurchaseOrderItemsConfig()}
                  dataList={
                    modalDetails?.items?.slice(
                      (itemsPage - 1) * 2,
                      (itemsPage - 1) * 2 + 2
                    ) || []
                  }
                  filters={{ page: itemsPage }}
                  pageCount={Math.ceil((modalDetails?.items?.length || 0) / 2)}
                  onClick={(data, type, index, value) => {
                    actionHandler(
                      data,
                      type,
                      setModalDetails,
                      (itemsPage - 1) * 2 + index,
                      modalDetails,
                      setRefresh,
                      value,
                      setItemsPage,
                      itemsPage
                    );
                  }}
                  onChange={(page) => {
                    setItemsPage(page);
                  }}
                  defaultEmptyChar="-"
                />
              </div>
            </Grid>
          )}

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
              disabled={disableSaveButton(modalDetails)}
              onClick={() => {
                createPurchaseOrder(modalDetails, onSuccess);
              }}
            >
              Save
            </Button>
          </Grid>
        </CustomModal>
      )}
    </>
  );
};
