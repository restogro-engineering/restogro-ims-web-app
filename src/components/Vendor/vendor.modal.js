import CustomModal from "../../core/modal";
import { Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { createOrUpdateVendor, disableSaveButton } from "./helper";

export const VendorModal = ({
  title,
  closeModal,
  data,
  showModal,
  customModalContentClass,
  onSuccess,
}) => {
  const [vendorData, setVendorData] = useState({});
  useEffect(() => {
    if (data) {
      const { name, email, gstNo, id } = data;
      setVendorData({
        name,
        email,
        gstNo,
        id,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!showModal) {
      setVendorData({});
    }
  }, [showModal]);

  const setVendorDataOnChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            <Grid md={12} item>
              <TextField
                label="Name*"
                size="small"
                name="name"
                fullWidth
                onChange={setVendorDataOnChange}
                value={vendorData.name}
              />
            </Grid>

            <Grid md={12} item>
              <TextField
                label="Email *"
                size="small"
                name="email"
                fullWidth
                onChange={setVendorDataOnChange}
                value={vendorData.email}
              />
            </Grid>

            <Grid md={12} item>
              <TextField
                label=" GST Number *"
                size="small"
                name="gstNo"
                fullWidth
                onChange={setVendorDataOnChange}
                value={vendorData.gstNo}
              />
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
                disabled={disableSaveButton(vendorData)}
                onClick={() => {
                  createOrUpdateVendor(vendorData, onSuccess);
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CustomModal>
      )}
    </>
  );
};
