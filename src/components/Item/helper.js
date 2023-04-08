import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";

export const getHeaderConfig = () => {
  const config = [
    {
      label: "Code",
      id: "code",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Category",
      id: "category",
      render: (data, _, index) => {
        const value = data?.category?.name;
        return (
          <span className="si-cell" key={index}>
            {[null, undefined, NaN].includes(value) ? "-" : value}
          </span>
        );
      },
    },
    {
      label: "Sub Category",
      id: "subcategory",
      render: (data, _, index) => {
        const value = data?.subCategory?.name;
        return (
          <span className="si-cell" key={index}>
            {[null, undefined, NaN].includes(value) ? "-" : value}
          </span>
        );
      },
    },
    {
      label: "Minimum Stock",
      id: "minStock",
    },
    {
      label: "Base Unit",
      id: "baseUnit",
    },
    {
      label: "Custom Unit",
      id: "customUnit",
      render: (data, _, index) => {
        const value = data?.customUnit?.name;
        return (
          <span  key={index}>
            {[null, undefined, NaN].includes(value) ? "-" : value}
          </span>
        );
      },
    },
    {
      label: "Supply Price",
      id: "supplyPrice",
    },
    {
      label: "Price Per Base Unit",
      id: "pricePerBaseUnit",
      render: (data, _, index) => {
        const value = data?.customUnit?.name;
        return (
          <span  key={index}>
            {[null, undefined, NaN].includes(value) ? "-" : value}
          </span>
        );
      },
    },
    {
      label: "Actions",
      id: "edit",
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
