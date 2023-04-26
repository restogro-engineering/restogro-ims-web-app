import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const getHeaderConfig = () => {
  const config = [
    {
      label: "Vendor",
      id: "vendor",
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
      id: "poNumber",
    },
    {
      label: "PR Number",
      id: "prNumber",
    },
    {
      label: "Store",
      id: "store",
      render: (data, _, index) => {
        return (
          <span className="si-cell" key={data?.id}>
            {data?.store?.name || typeof data?.store !== "object" && data?.store}
          </span>
        );
      },
    },
    {
      label: "Is Delivery Address Deployment Address",
      id: "isDeliveryAddressDeploymentAddress",
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
      id: "edit",
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
