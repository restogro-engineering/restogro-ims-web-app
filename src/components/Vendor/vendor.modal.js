import CustomModal from "../../core/modal";
import { Button, } from "@mui/material";
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
            headerBackgroundColor: "#008952",
            customClass: `${
              customModalContentClass ? customModalContentClass : ""
            }`,
          }}
          onClose={closeModal}
        >
          <div className="modal-input-container">
            <div>
              Name <span className="warning">*</span>
            </div>
            <TextField
              size="small"
              name="name"
              fullWidth
              onChange={setVendorDataOnChange}
              value={vendorData.name}
              placeholder="Name"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>

          <div className="modal-input-container">
            <div>
              Email <span className="warning">*</span>
            </div>
            <TextField
              size="small"
              name="email"
              fullWidth
              onChange={setVendorDataOnChange}
              value={vendorData.email}
              placeholder="Email"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>
          <div className="modal-input-container">
            <div>
              GST Number <span className="warning">*</span>
            </div>
            <TextField
              size="small"
              name="gstNo"
              fullWidth
              onChange={setVendorDataOnChange}
              value={vendorData.gstNo}
              placeholder="GST Number"
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
              disabled={disableSaveButton(vendorData)}
              onClick={() => {
                createOrUpdateVendor(vendorData, onSuccess);
              }}
            >
              {vendorData?.id ? "Update" : "Create"}
            </Button>
          </Stack>
        </CustomModal>
      )}
    </>
  );
};
