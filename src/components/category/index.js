import React, { useState, useEffect } from "react";
import MuiTable from "../../core/mui-table";
import { getHeaderConfig } from "./config";
import { HTTP_METHODS, invokeApi } from "../../utils/http-service";
import { HOSTNAME, REST_URLS } from "../../utils/endpoints";
import { Button, TextField, Autocomplete, Grid } from "@mui/material";
import Select from "react-select";
import CustomModal from "../../core/modal";
import { toast } from "react-toastify";
const Category = () => {
  const [tableData, setTableData] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "-createdAt",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [parentCategoryList, setParentCategoryList] = useState([]);
  const [edit, setEdit] = useState({ isEdit: false, editId: "" });
  const [createCategoryData, setCreateCategoryData] = useState({
    name: "",
    parent: null,
  });
  const getCategoryData = (filters) => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.CATEGORY}`,
      null,
      filters
    ).then((res) => {
      if (!res.message) {
        const result = res.results.map((ele) => ({
          ...ele,
          createdBy: ele?.account?.name,
          parentCategory: ele?.parent ? ele?.parent?.name : "None",
        }));
        setTableData({ ...res, results: result });
      }
    });
  };
  const closeModalHandler = () => {
    setIsCreateModalOpen(false);
    setCreateCategoryData({ name: "", parent: null });
  };
  const getCategoryList = () => {
    invokeApi(
      HTTP_METHODS.GET,
      `${HOSTNAME}${REST_URLS.LIST_PARENT_CATEGORY}`
    ).then((res) => {
      const result = res.map((ele) => ({ label: ele?.name, value: ele?.id }));
      setParentCategoryList(result);
    });
  };
  const createCategoryHandler = () => {
    invokeApi(
      HTTP_METHODS.POST,
      `${HOSTNAME}${REST_URLS.CATEGORY}`,
      createCategoryData
    ).then((res) => {
      if (res.message) {
        toast.error(res.message, { autoClose: 2000 });
        return;
      } else {
        toast.success("Category Created Successfully", { autoClose: 2000 });
        closeModalHandler();
        getCategoryData(filters);
      }
    });
  };
  const changeCategory = (data) => {
    setEdit({ isEdit: true, editId: data?.id });
    setIsCreateModalOpen(true);
    setCreateCategoryData({
      name: data?.name,
      parent: !data?.parent ? "" : data?.parent?.id,
    });
  };
  const editHandler = () => {
    if (edit?.editId) {
      invokeApi(
        HTTP_METHODS.PUT,
        `${HOSTNAME}${REST_URLS.CATEGORY}/${edit?.editId}`,
        createCategoryData
      ).then((res) => {
        if (res.message) {
          toast.error(res.message, { autoClose: 2000 });
          return;
        } else {
          toast.success("Category Updated Successfully", { autoClose: 2000 });
          setEdit({
            isEdit: false,
            editId: "",
          });
          closeModalHandler();
          getCategoryData(filters);
        }
      });
    }
  };
  useEffect(() => {
    getCategoryData(filters);
    getCategoryList();
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
        Create Category
      </Button>
      <MuiTable
        columnsList={getHeaderConfig()}
        dataList={tableData?.results || []}
        filters={filters}
        onClick={changeCategory}
        pageCount={tableData?.totalPages}
        onChange={(page) => {
          setFilters({
            ...filters,
            page,
          });
          getCategoryData({
            ...filters,
            page,
          });
        }}
      />
      {isCreateModalOpen && (
        <CustomModal
          title={edit?.isEdit ? "Edit Category" : "Create Category"}
          onClose={closeModalHandler}
        >
          <Grid md={12} container spacing={2}>
            <Grid md={12} item>
              <TextField
                label="Category Name"
                size="small"
                fullWidth
                value={createCategoryData?.name}
                onChange={(e) => {
                  setCreateCategoryData((prevVal) => ({
                    ...prevVal,
                    name: e?.target?.value,
                  }));
                }}
              />
            </Grid>
            <Grid md={12} item>
              <Select
                placeholder="Select Parent Category"
                options={parentCategoryList}
                value={
                  createCategoryData?.parent &&
                  parentCategoryList.find(
                    (ele) => ele?.value === createCategoryData?.parent
                  )
                }
                onChange={(e) => {
                  if (e?.value) {
                    setCreateCategoryData((prevVal) => ({
                      ...prevVal,
                      parent: e?.value,
                    }));
                  }
                }}
              />
            </Grid>
            <Grid
              md={12}
              item
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
              spacing={2}
            >
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 3 }}
                fullWidth
                onClick={closeModalHandler}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={edit?.isEdit ? editHandler : createCategoryHandler}
                disabled={!createCategoryData?.name}
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

export default Category;
