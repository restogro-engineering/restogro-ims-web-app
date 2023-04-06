const service = "/v1/";
export const REST_URLS = {
  LOGIN: `${service}auth/login`,
  LOGOUT: `${service}auth/logout`,
  REGISTER: `${service}auth/register`,
  REFRESH_TOKEN: `${service}auth/refresh-tokens`,
  ALL_STAGE_NAMES: `${service}lead/stage/all-names`,
  CREATE_LEASE: `${service}lead`,
  LEADS_LIST: `${service}lead`,
  GET_LEAD_BY_ID: `${service}lead/`,
  UPDATE_LEASE_BY_ID: `${service}lead/`,
  USERS_LIST: `${service}users/all-user-names`,
};

// export const HOSTNAME = "https://dev-api.mysubway.in";
export const HOSTNAME = "http://localhost:4000";
