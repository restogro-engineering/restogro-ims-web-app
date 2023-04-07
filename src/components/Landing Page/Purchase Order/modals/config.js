import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

export const createPurchaseOrderItemsConfig = () => {
  let config = [
    {
      label: "Code",
      key: "code",
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Quantity",
      key: "quantity",
      render: (data, onClick, index) => {
        return (
          <span className="si-cell" key={data.id}>
         
            <IconButton
            disabled={data?.quantity === 1}
              onClick={() => {
                onClick(data, "decrease item count", index);
              }}
            >
              <RemoveCircleIcon />
            </IconButton>
            {data?.quantity}

            <IconButton
              onClick={() => {
                onClick(data, "increase item count", index);
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </span>
        );
      },
    },
    {
      label: "Unit Price",
      key: "pricePerBaseUnit",
    },
    {
      label: "Total",
      key: "total",
      render: (data) => {
        return (
          <span className="si-cell" key={data.id}>
            {data?.quantity * data?.pricePerBaseUnit}
          </span>
        );
      },
    },
    {
      label: "Actions",
      value: "edit",
      render: (data, onClick, index) => {
        return (
          <div className="edit-icon">
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => {
                  onClick(data, "remove item", index);
                }}
                sx={{ p: 0 }}
              >
                <DeleteIcon id="edit" />
              </IconButton>
            </Stack>
          </div>
        );
      },
    },
  ];
  return config;
};

export const viewItemsConfig = () => {
  let config = [
    {
      label: "Code",
      key: "code",
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Quantity",
      key: "quantity",
      render: (data) => {
        return (
          <span className="si-cell" key={data.id}>
            {data?.quantity}
          </span>
        );
      },
    },
    {
      label: "Unit Price",
      key: "pricePerBaseUnit",
    },
    {
      label: "Total",
      key: "total",
      render: (data) => {
        return (
          <span className="si-cell" key={data.id}>
            {data?.quantity * data?.pricePerBaseUnit}
          </span>
        );
      },
    },
  ];
  return config;
};
