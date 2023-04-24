import EditIcon from "@mui/icons-material/Edit";
import { getOfflineData } from "../../utils/offline-services";
export const getHeaderConfig = () => {
  const user = getOfflineData("user");
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
      render: (data) => {
        return <div key={data?.id}>{user?.name}</div>;
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
