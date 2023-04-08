import { toast } from "react-toastify";

export const disableSaveButton = (data) => {
  return (
    !data?.vendor ||
    !data?.poNumber ||
    !data?.prNumber ||
    !data?.store ||
    !data?.items?.length
  );
};

export const validatePayload = (payload) => {
  let error = false;
  let errorMessage = "";
  payload?.items?.forEach?.((element) => {
    if (!element?.quantity || parseInt(element?.quantity) <= 0) {
      error = true;
      errorMessage = "Please enter count for all the items selected";
    }
  });
  if (error) {
    toast.error(errorMessage, { autoClose: 2000 });
  }
  return { error };
};

export const getPurchaseOrderPayload = (data) => {
  const payload = { ...data };
  delete payload.categories;
  payload.items = payload.items.map((item) => {
    return { itemId: item.value, quantity: item.quantity };
  });
  return payload;
};
