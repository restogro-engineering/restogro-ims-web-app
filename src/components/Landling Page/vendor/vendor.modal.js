import CustomModal from "../../../core/modal";
import { Button, TextareaAutosize } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

export const VendorModal = ({
  title,
  closeModal,
  data,
  showModal,
  customModalContentClass,
}) => {
  const [vendorData, setVendorData] = useState({});
  useEffect(() => {
    if (data) {
      const { name, email, gstNo } = data;
      setVendorData({
        name,
        email,
        gstNo,
      });
    }
  }, [data]);
  useEffect(() => {
    if (!showModal) {
      setVendorData({});
    }
  }, []);

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

          <Stack className="flexEnd" direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              onClick={closeModal}
            >
              {closeText ? closeText : "No"}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                if (approveFunction) {
                  approveFunction(
                    approvalData ? { ...approvalData, comment } : {}
                  );
                }

                closeModal(null);
              }}
            >
              {approveText ? approveText : "Yes"}
            </Button>
          </Stack>
        </CustomModal>
      )}
    </>
  );
};
