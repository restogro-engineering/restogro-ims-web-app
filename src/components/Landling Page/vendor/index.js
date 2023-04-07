import { useEffect, useState } from "react";
import "../index.scss";
import { Button } from "@mui/material";
import { HTTP_METHODS, invokeApi } from "../../../utils/http-service";
import { HOSTNAME } from "../../../utils/endpoints";
import { REST_URLS } from "../../../utils/endpoints";
import { toast } from "react-toastify";
import SiTable from "../../../core/table";
import { getHeaderConfig } from "./helper";

const Vendor = () => {
  const [filters, setFilters] = useState({
    sortBy: "-createdAt",
    limit: 10,
    page: 1,
  });
  const [tableData, setTableData] = useState({});

  const actionIconHandler = (data, type) => {};

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
          onClick={() => {}}
          //   className="franchise-agreement-DetailButton-active"
          //   startIcon={<FileCopyIcon />}
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
          onClick={actionIconHandler}
          onChange={(event, page) => {
            setFilters({
              ...filters,
              page,
            });
          }}
        ></SiTable>
      </div>
    </div>
  );
};

export default Vendor;
