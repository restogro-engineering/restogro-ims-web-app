import { getOfflineData } from "../../utils/offline-services";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
export const SIDE_MENU = () => {
  const user = getOfflineData("user");

  let options = [
    {
      label: "IMS",
      url: "/",
      value: "/",
      logo: <PendingActionsIcon sx={{ mr: 1 }} />,
    },
  ];

  return [...options];
};
