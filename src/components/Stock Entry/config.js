import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

export const getHeaderConfig = () => {
  let config = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Stock",
      key: "quantity",
    },
    {
      label: "Actions",
      key: "actions",
      render: (data, onClick) => {
        return (
          <div className="edit-icon">
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => {
                  onClick(data, "update stock entry");
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
