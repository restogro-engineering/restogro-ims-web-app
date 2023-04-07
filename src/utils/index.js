import { DATE_FORMATS } from "./constants";
import moment from "moment";

export const appendZeroToTime = (number) => {
  if (number >= 0 && number < 10) {
    return `0${number}`;
  }
  return number;
};

export const formatDate = (isoDateString, type) => {
  if (!isoDateString) {
    return "-";
  }
  try {
    const dateObj = new Date(isoDateString);
    if (Number.isNaN(dateObj.getTime())) {
      return "-";
    }
    switch (type) {
      case "dateString":
        return isoDateString === "" ? "-" : dateObj.toLocaleDateString();
      case "timeString":
        return dateObj.toLocaleTimeString();
      case DATE_FORMATS["YYYY-MM-DD"]: {
        const date = new Date(dateObj);
        const month = `${appendZeroToTime(date.getMonth() + 1)}`;
        const monthDisplay = `${month.slice(-2)}`;
        const day = `${appendZeroToTime(date.getDate())}`;
        const dayDisplay = `${day.slice(-2)}`;
        return [date.getFullYear(), monthDisplay, dayDisplay].join("-");
      }
      case DATE_FORMATS["DD-MM-YYYY"]: {
        const date = new Date(dateObj);
        const month = `${appendZeroToTime(date.getMonth() + 1)}`;
        const monthDisplay = `${month.slice(-2)}`;
        const day = `${appendZeroToTime(date.getDate())}`;
        const dayDisplay = `${day.slice(-2)}`;
        return [dayDisplay, monthDisplay, date.getFullYear()].join("-");
      }
      default:
        return `${dateObj.toLocaleDateString()} 
                    ${dateObj.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}`;
    }
  } catch (err) {
    return "Invalid Date";
  }
};
