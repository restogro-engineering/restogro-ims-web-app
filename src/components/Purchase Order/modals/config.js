import { IconButton } from "@mui/material";
import { Grid, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

export const createPurchaseOrderItemsConfig = () => {
  let config = [
    {
      label: "Code",
      id: "code",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Quantity",
      id: "quantity",
      render: (data, onClick, index, dataIndex) => {
        return (
          <span className="si-cell" key={data.id}>
            <Grid md={12} container spacing={2}>
              <Grid md={12} item>
                <TextField
                  label="Item count"
                  type="number"
                  size="small"
                  fullWidth
                  onChange={(e) => {
                    onClick(
                      data,
                      "change in item count",
                      dataIndex,
                      e?.target?.value
                    );
                  }}
                  value={`${data?.quantity || ""}`}
                />
              </Grid>
            </Grid>
          </span>
        );
      },
    },
    {
      label: "Unit Price",
      id: "pricePerBaseUnit",
      render: (data, _, index) => {
        const value = parseFloat(data?.pricePerBaseUnit);
        return (
          <span key={index}>
            {[null, undefined, NaN].includes(value )
              ? "-"
              :
              (Math.round(value * 100) / 100).toFixed(2)
              }
          </span>
        );
      },
    },
    {
      label: "Total",
      id: "total",
      render: (data) => {
        const value = data?.quantity * data?.pricePerBaseUnit;
        return (
          <span className="si-cell" key={data.id}>
            {value === 0 || value ? (Math.round(value * 100) / 100).toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      label: "Actions",
      id: "edit",
      render: (data, onClick, index, dataIndex) => {
        return (
          <div className="edit-icon">
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => {
                  onClick(data, "remove item", dataIndex);
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
      id: "code",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Quantity",
      id: "quantity",
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
      id: "pricePerBaseUnit",
    },
    {
      label: "Total",
      id: "total",
      render: (data) => {
        return (
          <span className="si-cell" key={data.id}>
            {(data?.quantity || data?.quantity === 0) &&
            (data?.pricePerBaseUnit || data?.pricePerBaseUnit === 0)
              ? data?.quantity * data?.pricePerBaseUnit
              : "-"}
          </span>
        );
      },
    },
  ];
  return config;
};
