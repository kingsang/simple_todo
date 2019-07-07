import Snackbar from "@material-ui/core/Snackbar";
import React from "react";

export const ErrorNotification = ({showErrorMessage, closeNotification}) => <Snackbar
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  open={showErrorMessage}
  autoHideDuration={4000}
  onClose={() => closeNotification()}
  ContentProps={{
    'aria-describedby': 'message-id',
  }}
  message={<span id="message-id">サーバーエラーが発生しました。</span>}
/>;