import EditIcon from "@mui/icons-material/Edit";
export const getHeaderConfig = () => {
  return [
    {
      label: "Category",
      id: "name",
    },
    {
      label: "Parent Category",
      id: "parentCategory",
    },
    {
      label: "Created By",
      id: "createdBy",
    },
    {
      label: "Actions",
      id: "action",
      render: (data, onClick) => {
        return (
          <div>
            <EditIcon
              color="secondary"
              onClick={() => onClick(data)}
              style={{ cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];
};
