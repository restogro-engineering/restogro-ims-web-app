import { useEffect, useState } from "react";
import CustomModal from "../../core/modal";
import { IconButton, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Stack from "@mui/material/Stack";
import { updateStockEntry } from "./apis";

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
            headerBackgroundColor: "#008952",
            customClass: "",
            
          }}
          onClose={closeModal}
        >
          <div>
            <IconButton
              className="hidden-button"
              disabled={count === 1}
              onClick={() => {
                setCount(count - 1);
              }}
            >
              <RemoveCircleIcon />
            </IconButton>{" "}
            {data?.name}
          </div>

          <div>
            <IconButton
              disabled={count === 0}
              onClick={() => {
                setCount(count - 1);
              }}
            >
              <RemoveCircleIcon />
            </IconButton>{" "}
            {count}{" "}
            <IconButton
              onClick={() => {
                setCount(count + 1);
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </div>
          <Stack className="flexEnd" direction="row" spacing={2} sx={{ mt: 1 }}>
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                updateStockEntry({ ...data, count }, onSuccess);
              }}
            >
              Update
            </Button>
          </Stack>
        </CustomModal>
      )}
    </>
  );
};
