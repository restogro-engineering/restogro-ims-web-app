import { toast } from "react-toastify";
import { HOSTNAME, REST_URLS } from "../../../../utils/endpoints";
import { HTTP_METHODS, invokeApi } from "../../../../utils/http-service";
import { getPurchaseOrderPayload } from "./helper-2";
export const getVendorList = (setDataFunc) => {
  invokeApi(
    HTTP_METHODS.GET,
    `${HOSTNAME}${REST_URLS.VENDOR_LIST_BY_VENDOR_ITEM_MASTER}`
  )
    .then((res) => {
      if (res?.message || typeof setDataFunc !== "function") {
        return;
      }
      const data =
        res?.map?.((item) => {
          return { label: item.name, value: item._id };
        }) || [];
      setDataFunc(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategoriesListByVendor = (params, setDataFunc) => {
  invokeApi(
    HTTP_METHODS.GET,
    `${HOSTNAME}${REST_URLS.CATEGORY_LIST_BY_VENDOR_ITEM_MASTER}`,
    null,
    params
  )
    .then((res) => {
      if (res?.message || typeof setDataFunc !== "function") {
        return;
      }
      const data = res?.map?.((item) => {
        return { label: item.name, value: item._id };
      });
      setDataFunc(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getItemListByCategory = async (params) => {
  let list = [];

  try {
    const data = await invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.ITEM_LIST_BY_CATEGORY_VENDOR_ITEM_MASTER}`,
      null,
      params
    );
    list =
      data?.map?.((item) => {
        return { label: item.item.name, value: item.item._id, ...item.item };
      }) || [];
  } catch (err) {
    console.log(err);
  }
  return list;
};

export const createPurchaseOrder = (data, onSuccess) => {
  const payload = getPurchaseOrderPayload(data);
  invokeApi(HTTP_METHODS.POST, `${HOSTNAME}${REST_URLS.CREATE_PURCHASE_ORDER}`, payload)
    .then((res) => {
      if (res?.message) {
        toast.error(res?.message, { autoClose: 2000 });
        return;
      }
      toast.success("Purchase Order created successfully", { autoClose: 2000 });
      onSuccess && onSuccess();
    })
    .catch((err) => {
      toast.error(err?.message, { autoClose: 2000 });
    });
};
