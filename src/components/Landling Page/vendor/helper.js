import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

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
