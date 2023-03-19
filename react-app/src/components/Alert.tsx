import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onCloseClicked: () => void;
}

const Alert = ({ children, onCloseClicked }: Props) => {
  return (
    <div
      className="alert alert-primary alert-dismissible fade show"
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onCloseClicked}
      ></button>
    </div>
  );
};

export default Alert;
