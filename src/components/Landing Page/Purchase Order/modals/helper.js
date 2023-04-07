import { getKeyMap } from "../../../../utils/misc";
import {
  getVendorList,
  getItemListByCategory,
  getCategoriesListByVendor,
} from "./apis";

export const setCreateModalDetailsOnChange = (
  e,
  type,
  setDataFunc,
  details,
  setItemsListFunc,
  setCategoryListFunc,
  modalData,
  itemList
) => {
  switch (type) {
    case "select":
      {
        let deleteKeys = [];
        const { name } = details;
        switch (name) {
          case "vendor":
            deleteKeys.push("items", "categories");
            getCategoriesListByVendor(
              { vendor: e?.value },
              setCategoryListFunc
            );
            break;
          default:
            break;
        }
        setDataFunc((prevData) => {
          deleteKeys.forEach((deleteKey) => {
            delete prevData[deleteKey];
          });
          return {
            ...prevData,
            [name]: e?.value,
          };
        });
      }
      break;
    case "multiSelect":
      {
        const { name } = details;
        let updatedData = {};
        switch (name) {
          case "categories":
            const curCategories = modalData?.categories || [];
            const newCategories = e;
            const curCategoriesMap = getKeyMap(curCategories, "value");
            const newCategoriesMap = getKeyMap(newCategories, "value");
            if (curCategories.length > newCategories.length) {
              let removeCategory;
              curCategories.forEach((item) => {
                const { value } = item;
                if (!newCategoriesMap[value]) {
                  removeCategory = item;
                }
              });
              const newItemsList = itemList.filter(
                (item) => item.category !== removeCategory.value
              );
              setItemsListFunc(newItemsList);
              const newSelectedItems = (modalData?.items || []).filter(
                (item) => item.category !== removeCategory.value
              );
              updatedData.items = newSelectedItems;
            } else if (curCategories.length < newCategories.length) {
              let newCategory;
              newCategories.forEach((item) => {
                const { value } = item;
                if (!curCategoriesMap[value]) {
                  newCategory = item;
                }
              });

              (async () => {
                const data = await getItemListByCategory({
                  category: newCategory.value,
                  vendor: parseInt(modalData.vendor),
                });
                const newItemsList = [...itemList, ...data];
                setItemsListFunc(newItemsList);
              })();
            }
            break;
          case "items":
            e.forEach((item, index) => {
              if (!item.hasOwnProperty("quantity")) {
                e[index].quantity = 1;
              }
            });
            break;
          default:
            break;
        }

        setDataFunc((prevData) => ({
          ...prevData,
          [name]: e,
          ...updatedData,
        }));
      }
      break;
    case "checkbox":
      {
        const { name, value } = e;
        setDataFunc((prevData) => ({
          ...prevData,
          [name]: value,
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

export const actionHandler = (
  data,
  type,
  setDataFunc,
  index,
  modalData,
  setRefresh
) => {
  const newModalData = { ...modalData };
  switch (type) {
    case "decrease item count":
      {
        let quantity = modalData.items[index].quantity;
        quantity -= 1;
        if (quantity > 0) {
          newModalData.items[index].quantity = quantity;
        }
      }
      break;
    case "increase item count":
      newModalData.items[index].quantity += 1;
      break;
    case "remove item":
      newModalData.items.splice(index, 1);
      setRefresh("items list");
      break;
    default:
      break;
  }
  setTimeout(() => {
    setRefresh("");
  }, 0);

  setDataFunc(newModalData);
};
