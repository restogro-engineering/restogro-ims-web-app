const service = "/v1/";
export const REST_URLS = {
  LOGIN: `${service}auth/login`,
  LOGOUT: `${service}auth/logout`,
  REGISTER: `${service}auth/register`,
  REFRESH_TOKEN: `${service}auth/refresh-tokens`,
  QUERY_VENDORS: `${service}vendor`,
  CATEGORY: `${service}category`,
  LIST_PARENT_CATEGORY: `${service}category/get-parent-categories`,
  UNIT: `${service}unit`,
};

// export const HOSTNAME = "https://dev-api.mysubway.in";
export const HOSTNAME = "http://localhost:4000";
