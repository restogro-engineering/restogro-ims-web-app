import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const getHeaderConfig = () => {
  const config = [
    {
      label: "Vendor",
      key: "vendor",
      render: (data, _, index) => {
        return (
          <span className="si-cell" key={index}>
            {data?.vendor?.name}
          </span>
        );
      },
    },
    {
      label: "PO Number",
      key: "poNumber",
    },
    {
      label: "PR Number",
      key: "prNumber",
    },
    {
      label: "Store",
      key: "store",
    },
    {
      label: "Is Delivery Address Deployment Address",
      key: "isDeliveryAddressDeploymentAddress",
      render: (data, _, index) => {
        return (
          <span className="si-cell" key={index}>
            <FormControlLabel
              value="start"
              checked={!!data?.isDeliveryAddressDeploymentAddress}
              control={<Checkbox color="primary" />}
            />
          </span>
        );
      },
    },
    {
      label: "Items",
      value: "edit",
      render: (data, onClick) => {
        return (
          <div className="edit-icon">
            <RemoveRedEyeIcon
              onClick={() => onClick(data, "view items")}
              sx={{ cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];

  return config;
};
