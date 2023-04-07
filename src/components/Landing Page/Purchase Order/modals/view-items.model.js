import CustomModal from "../../../../core/modal";
import SiTable from "../../../../core/table";
import { useState } from "react";
import { viewItemsConfig } from "./config";

export const ViewItemsModal = ({ showModal, closeModal, data }) => {
  const [page, setPage] = useState(1);
  return (
    <>
      {showModal && (
        <CustomModal
          title="Item Details"
          contentClassName={{
            headerBackgroundColor: "#008952",
            customClass: "",
          }}
          onClose={closeModal}
        >
          <div className="view-items-table">
            <SiTable
              header={viewItemsConfig()}
              data={
                data?.slice((page - 1) * 10, (page - 1) * 10 + 10) || []
              }
              filters={{ page }}
              pageCount={Math.ceil((data?.length || 0) / 10)}
              customSiRowClass="item-table-row"
              onChange={(event, page) => {
                setPage(page);
              }}
            ></SiTable>
          </div>
        </CustomModal>
      )}
    </>
  );
};
