import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export const recipeItemHeaderConfig = () => {
  return [
    {
      label: "Item",
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
              onClick={() => onClick(data, "edit")}
              style={{ cursor: "pointer" }}
            />
            <DeleteIcon
              color="error"
              onClick={() => onClick(data, "delete")}
              style={{ cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];
};
