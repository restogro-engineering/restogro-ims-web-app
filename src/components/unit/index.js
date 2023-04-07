import React, { useState, useEffect } from "react";
import MuiTable from "../../core/mui-table";
import { BASE_UNITS, getHeaderConfig } from "./config";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { Button, TextField, Autocomplete, Grid } from "@mui/material";
import Select from "react-select";
import CustomModal from "../../core/modal";
import { toast } from "react-toastify";

const Unit = () => {
  const [tableData, setTableData] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "-createdAt",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [edit, setEdit] = useState({ isEdit: false, editId: "" });
  const [createUnitData, setCreateUnitData] = useState({
    baseUnit: "",
    conversionFactor: "",
    name: "",
  });
  const getUnitData = (filters) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.UNIT}`,
      null,
      filters
    ).then((res) => {
      if (!res.message) {
        const result = res.results.map((ele) => ({
          ...ele,
          createdBy: ele?.account?.name || "-",
        }));
        setTableData({ ...res, results: result });
      }
    });
  };
  const closeModalHandler = () => {
    setIsCreateModalOpen(false);
    setCreateUnitData({ baseUnit: "", name: "", conversionFactor: "" });
  };
  const createUnitHandler = () => {
    invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.UNIT}`,
      createUnitData
    ).then((res) => {
      if (res.message) {
        toast.error(res.message, { autoClose: 2000 });
        return;
      } else {
        toast.success("Custom Unit Created Successfully", { autoClose: 2000 });
        closeModalHandler();
        getUnitData(filters);
      }
    });
  };
  const changeUnit = (data) => {
    setEdit({ isEdit: true, editId: data?.id });
    setIsCreateModalOpen(true);
    setCreateUnitData({
      name: data?.name,
      conversionFactor: data?.conversionFactor,
      baseUnit: data?.baseUnit,
    });
  };
  const editHandler = () => {
    if (edit?.editId) {
      invokeApi(
        HTTP_METHODS.PUT,
        `${HOSTNAME}${REST_URLS.UNIT}/${edit?.editId}`,
        createUnitData
      ).then((res) => {
        if (res.message) {
          toast.error(res.message, { autoClose: 2000 });
          return;
        } else {
          toast.success("Unit Updated Successfully", { autoClose: 2000 });
          setEdit({
            isEdit: false,
            editId: "",
          });
          closeModalHandler();
          getUnitData(filters);
        }
      });
    }
  };
  useEffect(() => {
    getUnitData(filters);
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ float: "right", mb: 1 }}
        onClick={() => {
          setIsCreateModalOpen(true);
        }}
      >
        Craete Custom Unit
      </Button>
      <MuiTable
        columnsList={getHeaderConfig()}
        dataList={tableData?.results || []}
        filters={filters}
        onClick={changeUnit}
        pageCount={tableData?.totalPages}
        onChange={(page) => {
          setFilters({
            ...filters,
            page,
          });
          getUnitData({
            ...filters,
            page,
          });
        }}
      />
      {isCreateModalOpen && (
        <CustomModal
          title={edit?.isEdit ? "Edit Unit" : "Create Unit"}
          onClose={closeModalHandler}
        >
          <Grid md={12} container spacing={2} sx={{ width: "30rem" }}>
            <Grid md={12} item>
              <TextField
                label="Name"
                size="small"
                fullWidth
                value={createUnitData?.name}
                onChange={(e) => {
                  setCreateUnitData((prevVal) => ({
                    ...prevVal,
                    name: e?.target?.value,
                  }));
                }}
              />
            </Grid>

            <Grid md={12} item>
              <TextField
                label="Conversion Factor"
                size="small"
                fullWidth
                type="number"
                value={createUnitData?.conversionFactor}
                onChange={(e) => {
                  setCreateUnitData((prevVal) => ({
                    ...prevVal,
                    conversionFactor: e?.target?.value,
                  }));
                }}
              />
            </Grid>
            <Grid md={12} item>
              <Select
                placeholder="Select Base Unit"
                options={BASE_UNITS}
                value={BASE_UNITS.find(
                  (ele) => ele?.value === createUnitData?.baseUnit
                )}
                onChange={(e) => {
                  if (e?.value) {
                    setCreateUnitData((prevVal) => ({
                      ...prevVal,
                      baseUnit: e?.value,
                    }));
                  }
                }}
                styles={{ width: "2rem" }}
              />
            </Grid>
            <Grid md={12} item sx={{ display: "flex" }}>
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 2 }}
                fullWidth
                onClick={closeModalHandler}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={edit?.isEdit ? editHandler : createUnitHandler}
                disabled={!createUnitData?.name}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CustomModal>
      )}
    </div>
  );
};

export default Unit;
