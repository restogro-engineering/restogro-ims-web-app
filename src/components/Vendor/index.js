import {  useState } from "react";
import "./index.scss";
import { Button } from "@mui/material";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME } from "../../utils/endpoints";
import { REST_URLS } from "../../utils/endpoints";
import { toast } from "react-toastify";
import SiTable from "../../core/table";
import { getHeaderConfig } from "./helper";
import { VendorModal } from "./vendor.modal";

const Vendor = () => {
  const [filters, setFilters] = useState({
    sortBy: "-createdAt",
    limit: 10,
    page: 1,
  });
  const [tableData, setTableData] = useState({});
  const [modalDetails, setModalDetails] = useState({});

  const vendorHandler = (data, type) => {
    switch (type) {
      case "update vendor":
        setModalDetails({
          data,
          title: "Update Vendor Details",
          showModal: true,
        });
        break;
      case "create vendor":
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

  const getVendorData = (vendorFilter) => {
    const queryParams =
      vendorFilter && typeof vendorFilter === "object"
        ? { ...vendorFilter }
        : { ...filters };
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.QUERY_VENDORS}`,
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

  // useEffect(() => {
  //   getVendorData(filters);
  // }, [filters]);
  return (
    <div className="vendor-container">
      <div className="create-vendor-button">
        <Button
          variant="contained"
          onClick={() => {
            vendorHandler(null, "create vendor");
          }}
        >
          Create
        </Button>
      </div>

      <div className="vendor-table">
        <SiTable
          header={getHeaderConfig()}
          data={tableData.results || []}
          filters={filters}
          customSiRowClass="vendor-table-row"
          pageCount={tableData.totalPages}
          onClick={vendorHandler}
          onChange={(event, page) => {
            setFilters({
              ...filters,
              page,
            });
          }}
        ></SiTable>
      </div>
      <VendorModal
        title={modalDetails.title || ""}
        closeModal={() => {
          setModalDetails({});
        }}
        data={modalDetails.data || null}
        showModal={modalDetails.showModal || false}
        onSuccess={() => {
          setModalDetails({});
          getVendorData(filters);
        }}
      />
    </div>
  );
};

export default Vendor;
