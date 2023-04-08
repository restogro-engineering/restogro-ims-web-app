import { useEffect, useState } from "react";
import CustomModal from "../../core/modal";
import { Button, Grid, TextField } from "@mui/material";
import { updateStockEntry } from "./apis";
import { disableUpdateButton } from "./helper";

export const StockEntryUpdationModal = ({
  showModal,
  closeModal,
  onSuccess,
  data,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(data?.quantity || 0);
  }, [data]);
  return (
    <>
      {showModal && (
        <CustomModal
          title="Update Stock Entry"
          contentClassName={{
            // headerBackgroundColor: "#008952",
            customClass: "",
          }}
          onClose={closeModal}
        >
          <Grid md={12} container spacing={2}>
            <Grid md={12} item>
              <TextField
                label="Item Name"
                disabled={true}
                size="small"
                fullWidth
                value={data?.name || ""}
              />
            </Grid>

            <Grid md={12} item>
              <TextField
                label="Item count"
                type="number"
                size="small"
                fullWidth
                helperText="Item count cannot be less than 0"
                onChange={(e) => {
                  if (
                    (e?.target?.value && parseInt(e?.target?.value) < 0) ||
                    e?.target?.value === "-"
                  ) {
                    return;
                  }
                  setCount(e?.target?.value);
                }}
                value={`${count}`}
              />
            </Grid>
            <Grid
              md={12}
              item
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
              spacing={2}
            >
              <Button
                variant="outlined"
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
                disabled={disableUpdateButton(count)}
                onClick={() => {
                  updateStockEntry({ ...data, count }, onSuccess);
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
