import { useEffect, useState } from "react";
import "./index.scss";
import { getItemsList, queryStocketEntry } from "./apis";
import Select from "react-select";
import { dummyStoreOptions } from "../../utils/constants";
import { Button } from "@mui/material";
import { getHeaderConfig } from "./config";
import { actionHandler } from "./helper";
import { StockEntryUpdationModal } from "./modal";
import MuiTable from "../../core/mui-table";

export const StockEntry = () => {
  const [itemList, setItemList] = useState([]);
  const [tableData, setTableData] = useState({});
  const [modalDetails, setModalDetails] = useState({});
  const [filtersAfterClickingOnApplyButton, setFiltersAfterClickingOnApply] =
    useState({
      page: 1,
      limit: 10,
      sortBy: "-createdAt",
    });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "-createdAt",
  });

  useEffect(() => {
    getItemsList(setItemList);
  }, []);

  const handler = (data, type) => {
    actionHandler(data, type, setModalDetails, filters);
  };

  const closeModal = () => {
    setModalDetails({});
  };

  return (
    <div className="stock-entry-container">
      <div className="header-filter">
        <div className="header-filter-options">
          <Select
            placeholder="Select Store"
            options={dummyStoreOptions}
            onChange={(e) => {
              setFilters((prevFilters) => ({
                ...prevFilters,
                store: parseInt(e?.value),
              }));
            }}
            value={
              ![null, undefined].includes(filters.store)
                ? dummyStoreOptions.find((ele) => ele.value === filters.store)
                : null
            }
            styles={{
              menu: (provided) => ({
                ...provided,
                zIndex: 2,
              }),
            }}
          />
          <Select
            placeholder="Select Items"
            options={itemList}
            isMulti={true}
            name="items"
            onChange={(e) => {
              setFilters((prevFilters) => ({ ...prevFilters, items: e }));
            }}
            value={filters.items || []}
            styles={{
              menu: (provided) => ({
                ...provided,
                zIndex: 2,
              }),
            }}
          />
        </div>
        <div className="apply-button-container">
          <Button
            variant="outlined"
            disabled={!filters?.hasOwnProperty("store")}
            onClick={() => {
              queryStocketEntry(
                { ...filters, page: 1 },
                setTableData,
                filtersAfterClickingOnApplyButton
              );
              setFilters({ ...filters, page: 1 });
              setFiltersAfterClickingOnApply(filters);
            }}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="stock-entry-table">
        <MuiTable
          columnsList={getHeaderConfig()}
          dataList={tableData.results || []}
          filters={filters}
          pageCount={tableData.totalPages}
          onClick={(data, type) => {
            handler(data, type);
          }}
          onChange={( page) => {
            setFilters({ ...filters, page });

            queryStocketEntry(
              { ...filters, page: 1 },
              setTableData,
              { ...filtersAfterClickingOnApplyButton, page },
              true
            );
          }}
        />

      </div>
      <StockEntryUpdationModal
        showModal={modalDetails?.showModal || false}
        closeModal={closeModal}
        onSuccess={() => {
          queryStocketEntry(
            { ...filters, page: 1 },
            setTableData,
            { ...filtersAfterClickingOnApplyButton, page: filters.page },
            true
          );
          closeModal();
        }}
        defaultEmptyChar="-"
        data={modalDetails?.data}
      />
    </div>
  );
};

export default StockEntry;
