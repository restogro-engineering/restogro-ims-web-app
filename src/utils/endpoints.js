const service = "/v1/";
export const REST_URLS = {
  LOGIN: `${service}auth/login`,
  LOGOUT: `${service}auth/logout`,
  REGISTER: `${service}auth/register`,
  REFRESH_TOKEN: `${service}auth/refresh-tokens`,
  QUERY_VENDORS: `${service}vendor`,
  CREATE_VENDOR: `${service}vendor`,
  UPDATE_VENDOR: `${service}vendor/`,
  QUERY_ITEMS: `${service}item`,
  CREATE_ITEM: `${service}item`,
  UPDATE_ITEM: `${service}item/`,
  CATEGORY_NAME_LIST: `${service}category/names-list`,
  UNIT_NAME_LIST: `${service}unit/names-list`,
  VENDOR_LIST_BY_VENDOR_ITEM_MASTER: `${service}vendor/vendor-list`,
  CATEGORY_LIST_BY_VENDOR_ITEM_MASTER: `${service}category/list-by-vendor`,
  ITEM_LIST_BY_CATEGORY_VENDOR_ITEM_MASTER: `${service}item/list-by-category-vendor-item-master`,
  CREATE_PURCHASE_ORDER: `${service}purchase-order`,
  QUERY_PURCHASE_ORDERS: `${service}purchase-order`,
  // CATEGORY_LIST_BY_VENDOR_ITEM_MASTER:`${service}category`
  CATEGORY: `${service}category`,
  LIST_PARENT_CATEGORY: `${service}category/get-parent-categories`,
  UNIT: `${service}unit`,
  RECIPE: `${service}recipe`,
  GET_ALL_UNITS: `${service}unit/get-all-units`,
  GET_ALL_ITEMS: `${service}item/get-all-items`,
  QUERY_STOCK_ENTRY: `${service}stock/`,
  UPDATE_STOCK_ENTRY: `${service}stock/update-stock/`,
  ITEM_LIST_BY_ACCOUNT: `${service}item/list-by-account`,
};

// export const HOSTNAME = "https://dev-api.mysubway.in";
// export const HOSTNAME = "http://localhost:4000";
// export const CORE_HOST_NAME = "http://localhost:5000"

export const HOSTNAME = "http://35.154.230.30:3002";
export const CORE_HOST_NAME = "http://35.154.230.30:3001"
