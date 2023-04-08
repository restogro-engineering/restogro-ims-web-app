import { useEffect, useState } from "react";
import "./index.scss";
import { Button } from "@mui/material";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME } from "../../utils/endpoints";
import { REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import { getHeaderConfig } from "./config";
import { CreatePurchaseOrderModal } from "./modals/create-purchase-order";
import { ViewItemsModal } from "./modals/view-items.model";
import MuiTable from "../../core/mui-table";

const PurchaseOrder = () => {
  const [filters, setFilters] = useState({
    sortBy: "-createdAt",
    limit: 10,
    page: 1,
  });
  const [tableData, setTableData] = useState({});
  const [modalDetails, setModalDetails] = useState({});

  const purchaseOrderHandler = (data, type) => {
    switch (type) {
      case "create purchase order":
        setModalDetails({
          type: "create purchase order",
        });
        break;
      case "view items":
        {
          const itemData =
            data?.items?.map((item) => {
              return { ...item.itemId, quantity: item.quantity };
            }) || [];
          setModalDetails({
            type: "view items",
            data: itemData,
          });
        }
        break;
      default:
        break;
    }
  };
  const closeModal = () => {
    setModalDetails({});
  };

  const getPurchaseOrderData = (purchaseOrderFilter) => {
    const queryParams =
      purchaseOrderFilter && typeof purchaseOrderFilter === "object"
        ? { ...purchaseOrderFilter }
        : { ...filters };
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.QUERY_PURCHASE_ORDERS}`,
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
    getPurchaseOrderData(filters);
  }, [filters]);
  return (
    <div className="purchase-order-container">
      <Button
        variant="outlined"
        sx={{ float: "right", mb: 1 }}
        onClick={() => {
          purchaseOrderHandler(null, "create purchase order");
        }}
      >
        Create Purchase Order
      </Button>

      <MuiTable
        columnsList={getHeaderConfig()}
        dataList={tableData.results || []}
        filters={filters}
        onClick={purchaseOrderHandler}
        pageCount={tableData.totalPages}
        onChange={(page) => {
          setFilters({
            ...filters,
            page,
          });
        }}
      />

      <CreatePurchaseOrderModal
        showModal={modalDetails?.type === "create purchase order"}
        closeModal={closeModal}
        onSuccess={() => {
          closeModal();
          getPurchaseOrderData(filters);
        }}
      />
      <ViewItemsModal
        showModal={modalDetails?.type === "view items"}
        closeModal={closeModal}
        data={modalDetails.data || []}
      />
    </div>
  );
};

export default PurchaseOrder;
