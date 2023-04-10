import { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "@mui/material";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME } from "../../utils/endpoints";
import { REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import { getHeaderConfig,  } from "./helper";
import { ItemModal } from "./item.modal";
import MuiTable from "../../core/mui-table";

const Item = () => {
  const [filters, setFilters] = useState({
    sortBy: "-createdAt",
    limit: 10,
    page: 1,
  });
  const [tableData, setTableData] = useState({});
  const [modalDetails, setModalDetails] = useState({});

  const itemHandler = (data, type) => {
    switch (type) {
      case "update item":
        setModalDetails({
          data,
          title: "Update Item Details",
          showModal: true,
        });
        break;
      case "create item":
        setModalDetails({
          data,
          title: "Create Item",
          showModal: true,
        });
        break;
      default:
        break;
    }
  };

  const getItemData = (itemFilter) => {
    const queryParams =
      itemFilter && typeof itemFilter === "object"
        ? { ...itemFilter }
        : { ...filters };
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.QUERY_ITEMS}`,
      null,
      queryParams
    )
      .then((res) => {
        if (res?.message) {
          toast.error(res?.message, { autoClose: 2000 });
          return;
        }

        setTableData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItemData(filters);
  }, [filters]);
  return (
    <div className="item-container">
      <Button
        variant="outlined"
        sx={{ float: "right", mb: 1 }}
        onClick={() => {
          itemHandler(null, "create item");
        }}
      >
        Create Item
      </Button>

      <MuiTable
        columnsList={getHeaderConfig()}
        dataList={tableData.results || []}
        filters={filters}
        onClick={itemHandler}
        pageCount={tableData.totalPages}
        onChange={(page) => {
          setFilters({
            ...filters,
            page,
          });
        }}
        defaultEmptyChar="-"
      />
        <ItemModal
          title={modalDetails.title || ""}
          closeModal={() => {
            setModalDetails({});
          }}
          data={modalDetails.data || null}
          showModal={modalDetails.showModal || false}
          onSuccess={() => {
            setModalDetails({});
            getItemData(filters);
          }}
        />
    </div>
  );
};

export default Item;
