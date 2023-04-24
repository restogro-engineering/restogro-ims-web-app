import { HOSTNAME, REST_URLS } from "./endpoints";
import { HTTP_METHODS, invokeApi } from "./http-service";

export const getStoreSelectList = async () => {
  let storeList = [];
  try {
    const data = await invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.STORE_LIST}`
    );
    storeList =
      data?.results?.map?.((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      }) || [];
  } catch (err) {
    console.log(err);
  }

  return storeList;
};
