import { pick } from "../../utils/misc";

export const actionHandler = (data, type, setModalFunc, filters) => {
  switch (type) {
    case "update stock entry":
      setModalFunc({
        showModal: true,
        data: { ...data, store: filters.store },
      });
      break;
    default:
      break;
  }
};

export const getQueryPayload = (data) => {
  const query = pick(data, ["store", "items" , "limit", "page", "sortBy"]);
  if (query?.items?.length) {
    query.items = JSON.stringify(query?.items.map((item) => item.value));
  } else {
    delete query.items;
  }
  return query;
};

export const getUpdatePayload = (data) => {
  console.log(data)
  const payload = {
    store: data.store,
    items: [{ item: data._id, curStock: data.count }],
  };
  return payload;
};
