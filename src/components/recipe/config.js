import EditIcon from "@mui/icons-material/Edit";
export const recipeItemHeaderConfig = () => {
  return [
    {
      label: "Name",
      id: "item.name",
      render: (data) => {
        return data.item.name;
      },
    },
    {
      label: "Quantity",
      id: "quantity",
    },
    {
      label: "Unit",
      id: "item.unit",
      render: (data) => {
        return data.item.unit;
      },
    },
    {
      label: "Amount",
      id: "item.price",
      render: (data) => {
        return data.item.price;
      },
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
