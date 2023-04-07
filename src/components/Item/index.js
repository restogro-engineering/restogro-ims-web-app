import { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "@mui/material";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME } from "../../utils/endpoints";
import { REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import SiTable from "../../core/table";
import { getHeaderConfig } from "./helper";
import { ItemModal } from "./item.modal";

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
          title: "Create Vendor",
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
      <div className="create-item-button">
        <Button
          variant="contained"
          onClick={() => {
            itemHandler(null, "create item");
          }}
        >
          Create
        </Button>
      </div>

      <div className="item-table">
        <SiTable
          header={getHeaderConfig()}
          data={tableData.results || []}
          filters={filters}
          customSiRowClass="item-table-row"
          pageCount={tableData.totalPages}
          onClick={itemHandler}
          onChange={(event, page) => {
            setFilters({
              ...filters,
              page,
            });
          }}
        ></SiTable>
      </div>
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
