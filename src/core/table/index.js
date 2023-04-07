import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import "./index.scss";

const SiTable = ({
  header,
  data,
  pageCount,
  onClick,
  onChange,
  filters,
  customSiRowClass = "",
  customSelectMessage,
}) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (Number.isInteger(parseInt(filters?.page))) {
      setPage(filters.page);
    }
  }, [filters]);
  return (
    <div className="si-table-container">
      <div className="si-header">
        <div className={`si-row ${customSiRowClass}`}>
          {header.map((h) => {
            return (
              <div className="si-cell" key={h.key}>
                {h.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="si-body">
        {data.map((rowData, index) => {
          return (
            <div className={`si-row ${customSiRowClass}`} key={index}>
              {header.map((h, i) => {
                if (h.render) {
                  return h.render(rowData, onClick, index);
                }
                return (
                  <div>
                    <div className="si-cell si-hide-mobile" key={i}>
                      {rowData[h.key]}
                    </div>
                    <div className="si-cell-mobile si-hide-web" key={i}>
                      {rowData[h.key]}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        {data.length === 0 && (
          <span className="no-records">
            {customSelectMessage ? customSelectMessage : "No records"}
          </span>
        )}
      </div>
      <div className="si-pagination">
        {pageCount > 1 && (
          <Pagination
            page={page}
            count={pageCount}
            color="primary"
            onChange={(e, page) => {
              setPage(page);
              if (onChange) {
                onChange(e, page);
              }
            }}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default SiTable;
