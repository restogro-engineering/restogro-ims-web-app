import React, { useState, useEffect } from "react";
import "./index.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "@mui/material";

const MuiTable = ({
  dataList,
  columnsList,
  pageCount,
  onChange,
  filters,
  onClick,
  defaultEmptyChar,
}) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (Number.isInteger(parseInt(filters?.page))) {
      setPage(filters.page);
    }
  }, [filters]);
  return (
    <div>
      <TableContainer className={` con-scroll`}>
        <Table sx={{ minWidth: 650, border: "1px solid #e3e8e3" }} stickyHeader>
          <TableHead>
            <TableRow>
              {columnsList?.map((head) => (
                <TableCell
                  className="table-cell"
                  key={head.id}
                  align="center"
                  padding="none"
                >
                  {head.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList?.map((ele, dataIndex) => (
              <TableRow
                key={ele.id ? ele.id : dataIndex}
                style={{ cursor: "context-menu" }}
                className={dataIndex % 2 === 0 ? "evenRow" : "oddRow"}
              >
                {columnsList?.map((col, index) => {
                  if (col.render) {
                    return (
                      <TableCell
                        key={col.id ? col.id : index}
                        align="center"
                        className="body-cell"
                      >
                        {col.render(ele, onClick, index, dataIndex)}
                      </TableCell>
                    );
                  }
                  const value = ele[col.id];
                  return (
                    <TableCell
                      key={col.id ? col.id : index}
                      align="center"
                      className="body-cell"
                    >
                      {value === true
                        ? "Yes"
                        : value === false
                        ? "No"
                        : defaultEmptyChar
                        ? [null, undefined, NaN].includes(value)
                          ? defaultEmptyChar
                          : value
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="si-pagination">
        {pageCount > 1 && (
          <Pagination
            page={page}
            count={pageCount}
            color="primary"
            onChange={(e, page) => {
              setPage(page);
              if (onChange) {
                onChange(page);
              }
            }}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default MuiTable;
