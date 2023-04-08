import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { convertObjKeyType, pick } from "../../utils/misc";

export const getUnitsList = (setDataFunc) => {
  invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.UNIT_NAME_LIST}`)
    .then((res) => {
      if (res?.message || typeof setDataFunc !== "function") {
        return;
      }
      const data =
        res?.map?.((item) => {
          return { label: item.name, value: item.id };
        }) || [];

      setDataFunc(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategoriesList = (setDataFunc) => {
  invokeApi(HTTP_METHODS.GET, `${HOSTNAME}${REST_URLS.CATEGORY_NAME_LIST}`)
    .then((res) => {
      if (res?.message || typeof setDataFunc !== "function") {
        return;
      }
      const data =
        res?.map?.((item) => {
          return { label: item.name, value: item.id };
        }) || [];

      setDataFunc(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const disableSaveButton = (data) => {
  return false;
};

export const setModalData = (data, setDataFunc) => {
  if (data) {
    const details = pick(data, [
      "code",
      "name",
      "category",
      "subCategory",
      "curStock",
      "minStock",
      "baseUnit",
      "customUnit",
      "supplyPrice",
      "pricePerBaseUnit",
      "id",
    ]);
    if (details.category) {
      details.category = details.category.id;
    }
    if (details.subCategory) {
      details.subCategory = details.subCategory.id;
    }
    if (details.customUnit) {
      details.customUnit = details.customUnit.id;
    }
    convertObjKeyType(details, "curStock");
    convertObjKeyType(details, "minStock");
    convertObjKeyType(details, "supplyPrice");
    convertObjKeyType(details, "pricePerBaseUnit");
    setDataFunc(details);
  }
};

export const setModalDataOnChange = (e, type, setDataFunc, details) => {
  switch (type) {
    case "select":
      {
        const { name } = details;
        setDataFunc((prevData) => ({
          ...prevData,
          [name]: e?.value,
        }));
      }
      break;
    default:
      {
        const { name, value } = e.target;
        setDataFunc((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
      break;
  }
};
