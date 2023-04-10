import CustomModal from "../../../core/modal";
import SiTable from "../../../core/table";
import { useState } from "react";
import { viewItemsConfig } from "./config";
import MuiTable from "../../../core/mui-table";

export const ViewItemsModal = ({ showModal, closeModal, data }) => {
  const [page, setPage] = useState(1);
  return (
    <>
      {showModal && (
        <CustomModal
          title="Item Details"
          contentClassName={{
            // headerBackgroundColor: "#008952",
            customClass: "",
          }}
          onClose={closeModal}
        >
          <MuiTable
            columnsList={viewItemsConfig()}
            dataList={data?.slice((page - 1) * 10, (page - 1) * 10 + 10) || []}
            filters={{ page }}
            pageCount={Math.ceil((data?.length || 0) / 10)}
            onChange={( page) => {
              setPage(page);
            }}
            defaultEmptyChar="-"
          />
        </CustomModal>
      )}
    </>
  );
};
