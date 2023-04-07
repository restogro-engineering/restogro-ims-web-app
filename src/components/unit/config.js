import EditIcon from "@mui/icons-material/Edit";
export const getHeaderConfig = () => {
  return [
    {
      label: "Unit Name",
      id: "name",
    },
    {
      label: "Base Unit",
      id: "baseUnit",
    },
    {
      label: "Conversion Factor",
      id: "conversionFactor",
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
export const BASE_UNITS = [
  { label: "GRAM", value: "GRAM" },
  { label: "PIECE", value: "PIECE" },
];
