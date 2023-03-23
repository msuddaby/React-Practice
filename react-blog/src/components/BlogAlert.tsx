import { Alert, AlertColor, Collapse } from "@mui/material";
import { useEffect, useState } from "react";

export type BlogAlertType = {
  open?: boolean;
  type?: AlertColor;
  text?: string;
};

export function BlogAlert({ open, type, text }: BlogAlertType) {
  return (
    <>
      <Collapse in={open}>
        <Alert severity={type} className="mt-3">
          {text}
        </Alert>
      </Collapse>
    </>
  );
}

// export function SetAlert(type: AlertColor, text: string) {
//   setAlertType(type);
//   setAlertText(text);
// }

// export function OpenAlert() {
//   setAlertOpen(true);
// }

// export function CloseAlert() {
//   setAlertOpen(false);
// }
