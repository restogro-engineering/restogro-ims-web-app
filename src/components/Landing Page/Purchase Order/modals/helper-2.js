export const disableSaveButton = (data) => {
  return (
    !data?.vendor ||
    !data?.poNumber ||
    !data?.prNumber ||
    !data?.store ||
    !data?.items?.length
  );
};

export const getPurchaseOrderPayload = (data) => {
  const payload = { ...data };
  delete payload.categories;
  payload.items = payload.items.map((item) => {
    return { itemId: item.value, quantity: item.quantity };
  });
  return payload;
};
