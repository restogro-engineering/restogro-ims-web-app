import EditIcon from "@mui/icons-material/Edit";
import { getOfflineData } from "../../utils/offline-services";
export const getHeaderConfig = () => {
  const user = getOfflineData("user");

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
      render: (data) => {
        return <div key={data?.id}>{user?.name}</div>;
      },
    },
    {
      label: "Actions",
      id: "action",
      render: (data, onClick) => {
        return (
          <div key={data?.id}>
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
