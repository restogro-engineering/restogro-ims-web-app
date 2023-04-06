import { getOfflineData } from "../../utils/offline-services";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";
export const SIDE_MENU = () => {
  const user = getOfflineData("user");

  let options = [
    {
      label: "Lead Documents",
      url: "/",
      value: "/",
      logo: <PendingActionsIcon sx={{ mr: 1 }} />,
    },
  ];

  return [...options];
};
