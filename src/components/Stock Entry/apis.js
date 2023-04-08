import { toast } from "react-toastify";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { getQueryPayload, getUpdatePayload } from "./helper";

export const getItemsList = (setDataFunc) => {
  invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.ITEM_LIST_BY_ACCOUNT}`)
    .then((res) => {
      if (res?.message || typeof setDataFunc !== "function") {
        return;
      }
      const data =
        res?.map?.((item) => {
          return { label: item.name, value: parseInt(item.id) };
        }) || [];
      setDataFunc(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const queryStocketEntry = (
  filter,
  setDataFunc,
  prevFilters,
  usePrevFilters = false
) => {
  const payload = usePrevFilters
    ? getQueryPayload(prevFilters)
    : getQueryPayload(filter);

  invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.QUERY_STOCK_ENTRY}`, null, payload)
    .then((res) => {
      if (res?.message || typeof setDataFunc !== "function") {
        return;
      }
      setDataFunc(res);
    })
    .catch((err) => {
      toast.error(err?.message, { autoClose: 2000 });
    });
};

export const updateStockEntry = (details, onSuccess) => {
  const payload = getUpdatePayload(details);
  invokeApi(
    HTTP_METHODS.PUT,
    `${HOSTNAME}${REST_URLS.UPDATE_STOCK_ENTRY}`,
    payload
  )
    .then((res) => {
      if (res?.message) {
        toast.error(res?.message, { autoClose: 2000 });
        return;
      }
      toast.success("Stock Entry Updated Successfully");
      onSuccess && onSuccess();
    })
    .catch((err) => {
      toast.error(err?.message, { autoClose: 2000 });
    });
};
