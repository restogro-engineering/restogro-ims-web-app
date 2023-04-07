import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { HTTP_METHODS, invokeApi } from "../../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../../utils/endpoints";
import { toast } from "react-toastify";

export const getHeaderConfig = () => {
  const config = [
    {
      label: "Code",
      key: "code",
    },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Category",
      key: "category",
      render: (data, _, index) => {
        return (
          <span className="si-cell" key={index}>
            {data?.category?.name}
          </span>
        );
      },
    },
    {
      label: "Sub Category",
      key: "subcategory",
      render: (data, _, index) => {
        return (
          <span className="si-cell" key={index}>
            {data?.subCategory?.name}
          </span>
        );
      },
    },
    {
      label: "Current Stock",
      key: "curStock",
    },
    {
      label: "Minimum Stock",
      key: "minStock",
    },
    {
      label: "Base Unit",
      key: "baseUnit",
    },
    {
      label: "Custom Unit",
      key: "customUnit",
      render: (data, _, index) => {
        return (
          <span className="si-cell" key={index}>
            {data?.customUnit?.name}
          </span>
        );
      },
    },
    {
      label: "Supply Price",
      key: "supplyPrice",
    },
    {
      label: "Price Per Base Unit",
      key: "pricePerBaseUnit",
    },
    {
      label: "Actions",
      value: "edit",
      render: (data, onClick) => {
        return (
          <div className="edit-icon">
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => {
                  onClick(data, "update item");
                }}
                sx={{ p: 0 }}
              >
                <EditIcon id="edit" />
              </IconButton>
            </Stack>
          </div>
        );
      },
    },
  ];

  return config;
};

export const createOrUpdateItem = (data, onSuccess) => {
  const itemId = data.id;
  const method = itemId ? HTTP_METHODS.PUT : HTTP_METHODS.POST;
  const url = itemId
    ? `${REST_URLS.UPDATE_ITEM}${itemId}`
    : REST_URLS.CREATE_ITEM;
  const message = itemId
    ? "Item created successfully"
    : "Item Updated Successfully";
  invokeApi(method, `${HOSTNAME}${url}`, data)
    .then((res) => {
      if (res?.message) {
        toast.error(res?.message, { autoClose: 2000 });
        return;
      }
      toast.success(message, { autoClose: 2000 });
      onSuccess && onSuccess();
    })
    .catch((err) => {
      toast.error(err?.message, { autoClose: 2000 });
    });
};
