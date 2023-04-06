import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import CancelIcon from "@mui/icons-material/Cancel";
import "./index.scss";
import { IconButton } from "@mui/material";

const CustomModal = ({
  title,
  children,
  onClose,
  contentClassName,
  classesToPreventClosing = [],
}) => {
  let modalRef = useRef();
  // to disable the scroll on body
  useEffect(() => {
    let element = document.getElementsByTagName("body");
    if (element && element.length > 0) {
      element[0].style.overflow = "hidden";
    }
    return () => {
      if (element && element.length > 0) {
        element[0].style.overflow = "scroll";
      }
    };
  });
  //close modal on outside click
  useEffect(() => {
    let handler = (event) => {
      if (!modalRef.current.contains(event.target)) {
        let preventFromClosing = false;
        if (classesToPreventClosing.length > 0) {
          classesToPreventClosing.forEach((item) => {
            if (event.target.className.includes(item)) {
              preventFromClosing = true;
            }
          });
        }
        if (preventFromClosing) return;
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="custom-modal-container">
      <div
        className={`${contentClassName} ${contentClassName?.customClass} modal-content`}
        ref={modalRef}
      >
        {title && (
          <div
            className="modal-header"
            style={{
              backgroundColor:
                contentClassName && `${contentClassName.headerBackgroundColor}`,
            }}
          >
            <span className="modal-title">{title}</span>
            {onClose && (
              <IconButton className="close" onClick={onClose}>
                <CancelIcon style={{ color: "#fff", fontSize: 30 }} />
              </IconButton>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

CustomModal.defaultProps = {};
CustomModal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default CustomModal;
