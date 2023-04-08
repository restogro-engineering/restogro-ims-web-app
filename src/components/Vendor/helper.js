import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";

export const getHeaderConfig = () => {
  const config = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "GST Number",
      key: "gstNo",
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
                  onClick(data, "update vendor");
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

export const createOrUpdateVendor = (data, onSuccess) => {
  const vendorId = data.id;
  const method = vendorId ? HTTP_METHODS.PUT : HTTP_METHODS.POST;
  const url = vendorId
    ? `${REST_URLS.UPDATE_VENDOR}${vendorId}`
    : REST_URLS.CREATE_VENDOR;
  const message = vendorId
    ? "Vendor created successfully"
    : "Vendor Updated Successfully";
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


export const disableSaveButton = (data) => {
  return !data?.name || !data?.email || !data?.gstNo
}
