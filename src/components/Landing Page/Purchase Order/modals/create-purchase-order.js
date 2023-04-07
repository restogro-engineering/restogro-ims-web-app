import { useEffect, useState } from "react";
import CustomModal from "../../../../core/modal";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import { createPurchaseOrder, getVendorList } from "./apis";
import { actionHandler, setCreateModalDetailsOnChange } from "./helper";
import { formatDate } from "../../../../utils";
import { DATE_FORMATS, dummyStoreOptions } from "../../../../utils/constants";
import FormControlLabel from "@mui/material/FormControlLabel";
import SiTable from "../../../../core/table";
import { createPurchaseOrderItemsConfig } from "./config";
import { disableSaveButton } from "./helper-2";
import Checkbox from "@mui/material/Checkbox";
export const CreatePurchaseOrderModal = ({
  showModal,
  closeModal,
  onSuccess,
}) => {
  const [modalDetails, setModalDetails] = useState({});
  const [vendorList, setVendorList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [categoryList, setCategoriesList] = useState([]);
  const [itemsPage, setItemsPage] = useState(1);
  const [refresh, setRefresh] = useState("");

  const clearData = () => {
    setModalDetails({});
    setItemsPage(1);
    setItemList([]);
    setCategoriesList([]);
  };

  useEffect(() => {
    if (!showModal) {
      clearData();
    }
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
      itemList
    );
  };

  return (
    <>
      {showModal && (
        <CustomModal
          title="Create Purchase Order"
          contentClassName={{
            headerBackgroundColor: "#008952",
            customClass: "",
          }}
          onClose={closeModal}
        >
          <div className="modal-input-container">
            <div>
              Vendor <span className="warning">*</span>
            </div>
            <Select
              placeholder="Select Vendor"
              options={vendorList}
              name="vendor"
              onChange={(e, details) => {
                setModalDetailsOnChange(e, "select", details);
              }}
              value={
                ![null, undefined].includes(modalDetails.vendor)
                  ? vendorList.find((ele) => ele.value === modalDetails.vendor)
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
            <div>Date</div>
            <TextField
              size="small"
              name="name"
              fullWidth
              disabled
              value={formatDate(
                new Date().toISOString(),
                DATE_FORMATS["DD-MM-YYYY"]
              )}
              placeholder="Name"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>
              PO Number <span className="warning">*</span>
            </div>
            <TextField
              size="small"
              name="poNumber"
              fullWidth
              onChange={setModalDetailsOnChange}
              value={modalDetails.poNumber}
              placeholder="PO Number"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>
              PR Number <span className="warning">*</span>
            </div>
            <TextField
              size="small"
              name="prNumber"
              fullWidth
              onChange={setModalDetailsOnChange}
              value={modalDetails.prNumber}
              placeholder="PR Number"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>
              Store <span className="warning">*</span>
            </div>
            <Select
              placeholder="Select Store"
              options={dummyStoreOptions}
              name="store"
              onChange={(e, details) => {
                setModalDetailsOnChange(e, "select", details);
              }}
              value={
                ![null, undefined].includes(modalDetails.store)
                  ? dummyStoreOptions.find(
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
          </div>

          <div className="modal-input-container">
            <div>
              Categories <span className="warning">*</span>
            </div>
            <Select
              placeholder="Select categories"
              isMulti={true}
              options={categoryList}
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
          </div>

          <div className="modal-input-container">
            <div>
              Items
              <span className="warning">*</span>
            </div>
            {refresh !== "items list" && (
              <Select
                placeholder="Select items"
                isMulti={true}
                options={itemList}
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
          </div>
          {modalDetails?.categories?.length && (
            <div className="create-modal-table">
              <SiTable
                header={createPurchaseOrderItemsConfig()}
                data={
                  modalDetails?.items?.slice(
                    (itemsPage - 1) * 10,
                    (itemsPage - 1) * 10 + 10
                  ) || []
                }
                filters={{ page: itemsPage }}
                pageCount={Math.ceil((modalDetails?.items?.length || 0) / 10)}
                customSiRowClass="item-table-row"
                onClick={(data, type, index) => {
                  actionHandler(
                    data,
                    type,
                    setModalDetails,
                    (itemsPage - 1) * 10 + index,
                    modalDetails,
                    setRefresh
                  );
                }}
                onChange={(event, page) => {
                  setItemsPage(page);
                }}
                customSelectMessage="Please select items"
              ></SiTable>
            </div>
          )}

          <div className="modal-input-container">
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
                        value: !modalDetails.isDeliveryAddressDeploymentAddress,
                      },
                      "checkbox"
                    );
                  }}
                />
              }
              label="Is Delivery Address Deployment Address?"
              labelPlacement="start"
            />
          </div>

          <Stack className="flexEnd" direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={disableSaveButton(modalDetails)}
              onClick={() => {
                createPurchaseOrder(modalDetails, onSuccess);
              }}
            >
              Create
            </Button>
          </Stack>
        </CustomModal>
      )}
    </>
  );
};
